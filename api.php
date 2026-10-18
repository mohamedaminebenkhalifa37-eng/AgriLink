<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

require __DIR__ . '/config.php'; // fournit $pdo (ou répond 503 si MySQL est injoignable)

const ALLOWED_CATEGORIES = [
    'Matériel agricole',
    'Véhicules',
    'Récoltes & produits',
    'Semences',
    'Intrants',
    'Pièces',
];

const LISTING_COLUMNS = 'id, title, category, price, location, description, details, image_url, seller, created_at';

/* mbstring n'est pas activé par défaut sur toutes les installations PHP : on prévoit un repli. */
function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function textCut(string $value, int $length): string
{
    return function_exists('mb_substr') ? mb_substr($value, 0, $length, 'UTF-8') : substr($value, 0, $length);
}

function jsonBody(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode(($raw !== false && $raw !== '') ? $raw : '{}', true);

    if (!is_array($data)) {
        respond(['success' => false, 'message' => 'Corps JSON invalide.'], 400);
    }

    return $data;
}

function formatListing(array $row): array
{
    $row['id'] = (int) $row['id'];
    $row['price'] = (float) $row['price'];

    return $row;
}

function validatedListing(array $data): array
{
    $title = trim((string) ($data['title'] ?? ''));
    $category = trim((string) ($data['category'] ?? ''));
    $location = trim((string) ($data['location'] ?? ''));
    $description = trim((string) ($data['description'] ?? ''));
    $details = trim((string) ($data['details'] ?? ''));
    $price = filter_var($data['price'] ?? null, FILTER_VALIDATE_FLOAT);
    $imageUrl = trim((string) ($data['image_url'] ?? ''));

    if (textLength($title) < 4 || textLength($title) > 150) {
        respond(['success' => false, 'message' => 'Le titre doit contenir entre 4 et 150 caractères.'], 422);
    }
    if (!in_array($category, ALLOWED_CATEGORIES, true)) {
        respond(['success' => false, 'message' => 'Catégorie invalide.'], 422);
    }
    if ($price === false || $price < 0 || $price > 10000000) {
        respond(['success' => false, 'message' => 'Le prix est invalide.'], 422);
    }
    if (textLength($location) < 2 || textLength($location) > 120) {
        respond(['success' => false, 'message' => 'La localisation est invalide.'], 422);
    }
    if ($imageUrl !== '' && !preg_match('#^https?://#i', $imageUrl)) {
        $imageUrl = '';
    }

    return [
        'title'       => $title,
        'category'    => $category,
        'price'       => $price,
        'location'    => $location,
        'description' => textCut($description, 3000),
        'image_url'   => ($imageUrl !== '' && filter_var($imageUrl, FILTER_VALIDATE_URL)) ? textCut($imageUrl, 500) : null,
        'details'     => $details !== '' ? textCut($details, 120) : 'Nouvelle annonce',
    ];
}

$action = (string) ($_GET['action'] ?? 'listings');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

$id = null;
if (isset($_GET['id']) && $_GET['id'] !== '') {
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if ($id === false) {
        respond(['success' => false, 'message' => 'Identifiant invalide.'], 400);
    }
}

try {
    // GET ?action=categories
    if ($action === 'categories' && $method === 'GET') {
        $rows = $pdo->query(
            "SELECT category, COUNT(*) AS total
             FROM listings
             WHERE status = 'published'
             GROUP BY category
             ORDER BY category"
        )->fetchAll();
        respond(['success' => true, 'data' => $rows]);
    }

    // GET ?action=listings[&search=...][&category=...]
    if ($action === 'listings' && $method === 'GET' && $id === null) {
        $search = trim((string) ($_GET['search'] ?? ''));
        $category = trim((string) ($_GET['category'] ?? ''));
        $sql = 'SELECT ' . LISTING_COLUMNS . " FROM listings WHERE status = 'published'";
        $parameters = [];

        if ($search !== '') {
            // Un nom de paramètre par occurrence : obligatoire quand EMULATE_PREPARES est désactivé.
            $sql .= ' AND (title LIKE :search_title OR description LIKE :search_description OR location LIKE :search_location)';
            $like = '%' . $search . '%';
            $parameters['search_title'] = $like;
            $parameters['search_description'] = $like;
            $parameters['search_location'] = $like;
        }
        if ($category !== '') {
            $sql .= ' AND category = :category';
            $parameters['category'] = $category;
        }

        $sql .= ' ORDER BY created_at DESC, id DESC LIMIT 100';
        $statement = $pdo->prepare($sql);
        $statement->execute($parameters);
        respond(['success' => true, 'data' => array_map('formatListing', $statement->fetchAll())]);
    }

    // GET ?action=listings&id=1
    if ($action === 'listings' && $method === 'GET' && $id !== null) {
        $statement = $pdo->prepare(
            'SELECT ' . LISTING_COLUMNS . " FROM listings WHERE id = :id AND status = 'published'"
        );
        $statement->execute(['id' => $id]);
        $listing = $statement->fetch();
        if (!$listing) {
            respond(['success' => false, 'message' => 'Annonce introuvable.'], 404);
        }
        respond(['success' => true, 'data' => formatListing($listing)]);
    }

    // POST ?action=listings
    if ($action === 'listings' && $method === 'POST') {
        $listing = validatedListing(jsonBody());
        $statement = $pdo->prepare(
            "INSERT INTO listings
                (user_id, title, category, price, location, description, image_url, details, seller, status)
             VALUES
                (1, :title, :category, :price, :location, :description, :image_url, :details, 'Votre exploitation', 'published')"
        );
        $statement->execute($listing);
        $newId = (int) $pdo->lastInsertId();

        $statement = $pdo->prepare('SELECT ' . LISTING_COLUMNS . ' FROM listings WHERE id = :id');
        $statement->execute(['id' => $newId]);
        respond(['success' => true, 'data' => formatListing($statement->fetch())], 201);
    }

    // PUT ?action=listings&id=1
    if ($action === 'listings' && $method === 'PUT' && $id !== null) {
        $listing = validatedListing(jsonBody());

        $exists = $pdo->prepare("SELECT id FROM listings WHERE id = :id AND status <> 'archived'");
        $exists->execute(['id' => $id]);
        if (!$exists->fetch()) {
            respond(['success' => false, 'message' => 'Annonce introuvable.'], 404);
        }

        $listing['id'] = $id;
        $statement = $pdo->prepare(
            'UPDATE listings
             SET title = :title, category = :category, price = :price,
                 location = :location, description = :description,
                 image_url = :image_url, details = :details
             WHERE id = :id'
        );
        $statement->execute($listing);
        respond(['success' => true, 'message' => 'Annonce mise à jour.']);
    }

    // DELETE ?action=listings&id=1 (archivage, pas de suppression définitive)
    if ($action === 'listings' && $method === 'DELETE' && $id !== null) {
        $statement = $pdo->prepare("UPDATE listings SET status = 'archived' WHERE id = :id AND status <> 'archived'");
        $statement->execute(['id' => $id]);
        if ($statement->rowCount() === 0) {
            respond(['success' => false, 'message' => 'Annonce introuvable.'], 404);
        }
        respond(['success' => true, 'message' => 'Annonce archivée.']);
    }

    // POST ?action=favorites  { "listing_id": 1 }
    if ($action === 'favorites' && $method === 'POST') {
        $listingId = filter_var(jsonBody()['listing_id'] ?? null, FILTER_VALIDATE_INT);
        if (!$listingId) {
            respond(['success' => false, 'message' => 'Identifiant d’annonce invalide.'], 422);
        }

        $exists = $pdo->prepare("SELECT id FROM listings WHERE id = :id AND status = 'published'");
        $exists->execute(['id' => $listingId]);
        if (!$exists->fetch()) {
            respond(['success' => false, 'message' => 'Annonce introuvable.'], 404);
        }

        $statement = $pdo->prepare(
            'INSERT INTO favorites (user_id, listing_id)
             VALUES (1, :listing_id)
             ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP'
        );
        $statement->execute(['listing_id' => $listingId]);
        respond(['success' => true, 'message' => 'Favori ajouté.'], 201);
    }

    respond(['success' => false, 'message' => 'Route API introuvable.'], 404);
} catch (PDOException $exception) {
    respond(['success' => false, 'message' => 'Une erreur de base de données est survenue.'], 500);
} catch (Throwable $exception) {
    respond(['success' => false, 'message' => 'Une erreur interne est survenue.'], 500);
}
