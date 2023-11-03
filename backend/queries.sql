CREATE TABLE ad
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title VARCHAR(100) NOT NULL,
description TEXT,
owner VARCHAR(100) NOT NULL,
price INT,
picture VARCHAR(100),
location VARCHAR(100),
category VARCHAR(100),
createdAt DATE
)

CREATE TABLE tag
(
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
name VARCHAR(50) NOT NULL
)

ALTER TABLE Ad ADD COLUMN category_id INTEGER;

UPDATE ad
SET category_id = (
    SELECT id
    FROM category
    WHERE category.name = ad.category
);


CREATE TABLE category
(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(100) NOT NULL
)

DROP TABLE ad;

INSERT INTO category (name) 
VALUES ("voiture"), ("vêtement"), ("immobilier"), ("meuble"), ("jeux video"), ("autres"); 

INSERT INTO ad (title, description, owner, price, picture, location, category, createdAt) VALUES
('Test', 'Test', 'test@mail.com', 2200, 'www.test.com', 'Bordeaux', 'voiture', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 15000, 'www.test.com', 'Paris', 'voiture', '10-09-2023'),
('Test', 'Test', 'test@mail.com', 30, 'www.test.com', 'Lyon', 'autres', '05-09-2023'),
('Test', 'Test', 'test@mail.com', 10, 'www.test.com', 'Bordeaux', 'vêtement', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 150, 'www.test.com', 'Paris', 'autres', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 100000, 'www.test.com', 'Bordeaux', 'autres', '13-09-2023'),
('Test', 'Test', 'test@mail.com', 3, 'www.test.com', 'Lyon', 'vêtement', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 70, 'www.test.com', 'Paris', 'autres', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 67000, 'www.test.com', 'Bordeaux', 'autres', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 5750, 'www.test.com', 'Lyon', 'voiture', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 300, 'www.test.com', 'Bordeaux', 'vêtement', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 450, 'www.test.com', 'Lyon', 'autres', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 350000, 'www.test.com', 'Paris', 'autres', '07-09-2023'),
('Test', 'Test', 'test@mail.com', 1000, 'www.test.com', 'Lyon', 'vêtement', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 45, 'www.test.com', 'Paris', 'autres', '17-09-2023'),
('Test', 'Test', 'test@mail.com', 23, 'www.test.com', 'Lyon', 'vêtement', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 221000, 'www.test.com', 'Paris', 'autres', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 120, 'www.test.com', 'Lyon', 'autres', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 12000, 'www.test.com', 'Paris', 'voiture', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 40000, 'www.test.com', 'Lyon', 'autres', '03-09-2023')


SELECT * FROM ad;

SELECT * FROM ad WHERE location = "Bordeaux";

DELETE FROM ad WHERE price >= 0;
DELETE FROM ad;

UPDATE ad SET price = 0 WHERE createdAt = "01-09-2023";

SELECT AVG(price) FROM ad WHERE location = "Paris";

SELECT AVG(price), location FROM ad GROUP BY location;

SELECT ad.title, ad.description, category.name 
FROM ad 
JOIN category ON ad.category_id = category.id 
WHERE category.name = "vêtement" 
   OR category.name = "voiture";

SELECT AVG(price), category 
FROM ad
JOIN category ON ad.category_id = category.id
WHERE category.name = "autres";

SELECT *
FROM ad
JOIN category ON ad.category_id = category.id
WHERE category.name LIKE "v%";

INSERT INTO tag (name) VALUES ('furniture');
INSERT INTO tag (name) VALUES ('clothing');
INSERT INTO tag (name) VALUES ('electronics');
INSERT INTO tag (name) VALUES ('cars');
INSERT INTO tag (name) VALUES ('books');
INSERT INTO tag (name) VALUES ('other');


INSERT INTO category (name) VALUES
('Ameublement'),
('Electroménager'),
('Photographie'),
('Informatique'),
('Téléphonie'),
('Vélos'),
('Véhicules'),
('Sport'),
('Habillement'),
('Bébé'),
('Outillage'),
('Services'),
('Vacances');

SELECT * FROM category;

DELETE FROM ad;