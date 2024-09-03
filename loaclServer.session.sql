USE bebic75;
-- CREATE TABLE users (
--     name VARCHAR(256) NOT NULL,
--     password VARCHAR(256) NOT NULL
-- );
-- ALTER TABLE users
-- ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY;
-- CREATE TABLE books (
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(256) NOT NULL,
--     user_id int,
--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );
SELECT *
FROM users
    JOIN books ON users.id = books.user_id;