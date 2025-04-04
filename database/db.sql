
--sql I use for this--


-- USE management;

-- CREATE TABLE users(
--  id INT NOT NULL auto_increment,
--  Email varchar(256) NOT NULL,
--  Password varchar(256) NOT NULL,
--  name VARCHAR(256) NOT NULL,
--  primary key(id)
-- );

-- CREATE TABLE projects (
--  id INT NOT NULL AUTO_INCREMENT,
--  name VARCHAR(256) NOT NULL,
--  description TEXT,
--  owner_id INT,
--  PRIMARY KEY (id),
--  FOREIGN KEY (owner_id) REFERENCES users(id)
-- );

-- CREATE TABLE tasks(
--  id INT NOT NULL AUTO_INCREMENT,
--  project_id INT NOT NULL,
--  title varchar(256) NOT NULL,
--  description text,
--  status ENUM('to-do', 'in-progress', 'done') DEFAULT 'to-do',
--  assigned_to INT,
--  due_date date,
--  PRIMARY KEY (id),
--  FOREIGN KEY (assigned_to) REFERENCES users(id),
--  FOREIGN KEY (project_id) REFERENCES projects(id)
-- );

-- CREATE TABLE ProjectMembers(
--  id int not null auto_increment,
--  project_id int not null,
--  user_id INT NOT NULL,
--  role ENUM('owner', 'admin', 'member') DEFAULT 'member',
--  PRIMARY KEY (id),
--  FOREIGN KEY (project_id) REFERENCES projects(id),
--  FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- CREATE TABLE Comments(
--  id int not null auto_increment,
--  task_id int not null,
--  user_id INT NOT NULL,
--  coment text,
--  PRIMARY KEY (id),
--  FOREIGN KEY(task_id) REFERENCES tasks(id),
--  FOREIGN KEY(user_id) REFERENCES users(id)
-- );

-- INSERT INTO users (Email, Password, name) VALUES 
-- ('alice@example.com', 'password123', 'Alice Smith'),
-- ('bob@example.com', 'password456', 'Bob Johnson'),
-- ('carol@example.com', 'password789', 'Carol Williams');

-- INSERT INTO projects (name, description, owner_id) VALUES 
-- ('Project Alpha', 'Initial project for alpha testing with key features.', 1),
-- ('Project Beta', 'Secondary project focusing on beta testing and improvements.', 2);

-- INSERT INTO tasks (project_id, title, description, status, assigned_to, due_date) VALUES 
-- (1, 'Setup environment', 'Complete the initial setup for Project Alpha.', 'to-do', 1, '2024-08-30'),
-- (1, 'Write documentation', 'Create detailed documentation for Project Alpha.', 'in-progress', 2, '2024-09-10'),
-- (2, 'Prepare beta environment', 'Set up the testing environment for Project Beta.', 'to-do', 2, '2024-09-15'),
-- (2, 'Collect feedback', 'Gather feedback from initial beta tests.', 'to-do', 3, '2024-09-25');

-- INSERT INTO ProjectMembers (project_id, user_id, role) VALUES 
-- (1, 1, 'owner'),
-- (1, 2, 'member'),
-- (2, 2, 'owner'),
-- (2, 3, 'member');

-- INSERT INTO Comments (task_id, user_id, coment) VALUES 
-- (1, 1, 'The environment setup is crucial for the success of the project.'),
-- (2, 2, 'Documentation is in progress and should be completed soon.'),
-- (3, 2, 'Beta environment setup is on track, expected completion by due date.'),
-- (4, 3, 'Feedback will be collected and reviewed by the end of the week.');
-- INSERT INTO users (Email, Password, name) VALUES 
-- ('admin@gmail.com', 'admin1234', 'admin');

-- INSERT INTO ProjectMembers (project_id, user_id, role) VALUES 
-- (1,5,'admin');

