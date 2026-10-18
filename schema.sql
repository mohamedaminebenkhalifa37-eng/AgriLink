-- AgriPlace : schéma MySQL / MariaDB + données de démonstration.
-- Ce script peut être exécuté plusieurs fois sans erreur ni doublon.

CREATE DATABASE IF NOT EXISTS agriplace
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE agriplace;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NULL,
  verified_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS listings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  location VARCHAR(120) NOT NULL,
  description TEXT NULL,
  details VARCHAR(120) NULL,
  image_url VARCHAR(500) NULL,
  seller VARCHAR(120) NOT NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_listings_category_status (category, status),
  INDEX idx_listings_created_at (created_at),
  CONSTRAINT fk_listings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS favorites (
  user_id INT UNSIGNED NOT NULL,
  listing_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, listing_id),
  CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_favorites_listing FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Compte de démonstration (id = 1) auquel l'API rattache les annonces.
-- Le hash "!" ne correspond à aucun mot de passe : ce compte ne peut pas se connecter.
INSERT IGNORE INTO users (id, name, email, password_hash, verified_at)
VALUES (1, 'Compte de démonstration', 'demo@agriplace.fr', '!', CURRENT_TIMESTAMP);

INSERT INTO listings (user_id, title, category, price, location, description, details, image_url, seller, status, created_at)
SELECT 1, 'Tracteur John Deere 5075E', 'Matériel agricole', 32500, 'Orléans, Loiret', 'Tracteur entretenu, prêt à travailler.', '2019 · 1 250 h', 'https://images.unsplash.com/photo-1614977645540-7abd88ba8e56?auto=format&fit=crop&w=900&q=85', 'Ferme des Vallons', 'published', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM listings WHERE title = 'Tracteur John Deere 5075E');

INSERT INTO listings (user_id, title, category, price, location, description, details, image_url, seller, status, created_at)
SELECT 1, 'Tracteur Massey Ferguson 5711', 'Véhicules', 44900, 'Auch, Gers', 'Première main et carnet d’entretien disponible.', '2021 · 890 h', 'https://images.unsplash.com/photo-1606739211185-2c846d734a6d?auto=format&fit=crop&w=900&q=85', 'EARL du Soleil', 'published', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 2 HOUR)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM listings WHERE title = 'Tracteur Massey Ferguson 5711');

INSERT INTO listings (user_id, title, category, price, location, description, details, image_url, seller, status, created_at)
SELECT 1, 'Pommes de terre — lot 2 tonnes', 'Récoltes & produits', 680, 'Arras, Pas-de-Calais', 'Pommes de terre issues de l’agriculture biologique.', 'Récolte 2025 · Bio', 'https://images.unsplash.com/photo-1591586116988-62fe65164f8d?auto=format&fit=crop&w=900&q=85', 'Maraîchers du Nord', 'published', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 3 HOUR)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM listings WHERE title = 'Pommes de terre — lot 2 tonnes');

INSERT INTO listings (user_id, title, category, price, location, description, details, image_url, seller, status, created_at)
SELECT 1, 'Semoir pneumatique 4 rangs', 'Matériel agricole', 8750, 'Poitiers, Vienne', 'Semoir révisé et disponible immédiatement.', 'Très bon état', 'https://images.unsplash.com/photo-1696441567908-6a04d49e1350?auto=format&fit=crop&w=900&q=85', 'Agri Services 86', 'published', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 4 HOUR)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM listings WHERE title = 'Semoir pneumatique 4 rangs');

INSERT INTO listings (user_id, title, category, price, location, description, details, image_url, seller, status, created_at)
SELECT 1, 'Semences de blé tendre certifiées', 'Semences', 540, 'Chartres, Eure-et-Loir', 'Semences certifiées, traitées, lot d’une tonne.', 'Lot 1 tonne · Certifié', 'https://images.unsplash.com/photo-1591586116988-62fe65164f8d?auto=format&fit=crop&w=900&q=85', 'Coopérative de la Beauce', 'published', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 5 HOUR)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM listings WHERE title = 'Semences de blé tendre certifiées');

INSERT INTO listings (user_id, title, category, price, location, description, details, image_url, seller, status, created_at)
SELECT 1, 'Engrais organique — palette 1 tonne', 'Intrants', 320, 'Rennes, Ille-et-Vilaine', 'Engrais organique conforme au cahier des charges bio.', 'Conforme agriculture bio', 'https://images.unsplash.com/photo-1591586116988-62fe65164f8d?auto=format&fit=crop&w=900&q=85', 'Bretagne Fertilisants', 'published', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 6 HOUR)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM listings WHERE title = 'Engrais organique — palette 1 tonne');

INSERT INTO listings (user_id, title, category, price, location, description, details, image_url, seller, status, created_at)
SELECT 1, 'Lot de pièces pour tracteur Renault', 'Pièces', 1250, 'Dijon, Côte-d''Or', 'Pièces d’origine neuves, lot complet.', 'Pièces d''origine · Neuf', 'https://images.unsplash.com/photo-1696441567908-6a04d49e1350?auto=format&fit=crop&w=900&q=85', 'Atelier Mécagri', 'published', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 7 HOUR)
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM listings WHERE title = 'Lot de pièces pour tracteur Renault');
