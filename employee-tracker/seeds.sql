-- seeds.sql

-- Seed Departments
INSERT INTO department (name) VALUES ('Engineering'), ('Human Resources'), ('Finance');

-- Seed Roles
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 70000, 1),
('HR Manager', 60000, 2),
('Accountant', 50000, 3);

-- Seed Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Emily', 'Jones', 3, NULL);
