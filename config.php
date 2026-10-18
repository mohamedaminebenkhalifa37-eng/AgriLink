<?php

declare(strict_types=1);

/**
 * Connexion à la base de données (MySQL / MariaDB) via PDO.
 *
 * Ordre de priorité des paramètres :
 *   1. backend/config.local.php (facultatif, copiez config.local.example.php)
 *   2. variables d'environnement DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
 *   3. valeurs par défaut ci-dessous (XAMPP : root sans mot de passe)
 */
$config = [
    'host'     => getenv('DB_HOST') ?: '127.0.0.1',
    'port'     => getenv('DB_PORT') ?: '3306',
    'name'     => getenv('DB_NAME') ?: 'agriplace',
    'user'     => getenv('DB_USER') ?: 'root',
    'password' => getenv('DB_PASSWORD') !== false ? (string) getenv('DB_PASSWORD') : '',
];

$localConfig = __DIR__ . '/config.local.php';
if (is_file($localConfig)) {
    $overrides = require $localConfig;
    if (is_array($overrides)) {
        $config = array_merge($config, $overrides);
    }
}

try {
    $pdo = new PDO(
        "mysql:host={$config['host']};port={$config['port']};dbname={$config['name']};charset=utf8mb4",
        (string) $config['user'],
        (string) $config['password'],
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $exception) {
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => 'Connexion à la base de données impossible.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
