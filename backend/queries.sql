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

DROP TABLE ad;

INSERT INTO ad (title, description, owner, price, picture, location, category, createdAt) VALUES
('Test', 'Test', 'test@mail.com', 2200, 'www.test.com', 'Bordeaux', 'Automobile', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 15000, 'www.test.com', 'Paris', 'Automobile', '10-09-2023'),
('Test', 'Test', 'test@mail.com', 30, 'www.test.com', 'Lyon', 'Jeux', '05-09-2023'),
('Test', 'Test', 'test@mail.com', 10, 'www.test.com', 'Bordeaux', 'Outillage', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 150, 'www.test.com', 'Paris', 'Jeux', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 100000, 'www.test.com', 'Bordeaux', 'Immobilier', '13-09-2023'),
('Test', 'Test', 'test@mail.com', 3, 'www.test.com', 'Lyon', 'Outillage', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 70, 'www.test.com', 'Paris', 'Jeux', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 67000, 'www.test.com', 'Bordeaux', 'Immobilier', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 5750, 'www.test.com', 'Lyon', 'Automobile', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 300, 'www.test.com', 'Bordeaux', 'Outillage', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 450, 'www.test.com', 'Lyon', 'Jeux', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 350000, 'www.test.com', 'Paris', 'Immobilier', '07-09-2023'),
('Test', 'Test', 'test@mail.com', 1000, 'www.test.com', 'Lyon', 'Outillage', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 45, 'www.test.com', 'Paris', 'Jeux', '17-09-2023'),
('Test', 'Test', 'test@mail.com', 23, 'www.test.com', 'Lyon', 'Outillage', '01-09-2023'),
('Test', 'Test', 'test@mail.com', 221000, 'www.test.com', 'Paris', 'Immobilier', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 120, 'www.test.com', 'Lyon', 'Jeux', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 12000, 'www.test.com', 'Paris', 'Automobile', '03-09-2023'),
('Test', 'Test', 'test@mail.com', 40000, 'www.test.com', 'Lyon', 'Immobilier', '03-09-2023')


SELECT * FROM ad;

SELECT * FROM ad WHERE location = "Bordeaux";

DELETE FROM ad WHERE price > 40;

UPDATE 

