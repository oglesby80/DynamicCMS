# DynamicCMS
DynamicCMS
Description
DynamicCMS is a command-line application built to manage a company's employee database using Node.js, Inquirer, and PostgreSQL. The application provides a simple and intuitive interface for non-developers to easily view, add, update, and delete information stored in the company's employee database. It acts as a Content Management System (CMS) for managing departments, roles, and employees.

Features
The application provides the following functionalities:

View All Departments: Displays a table showing department names and their IDs.
View All Roles: Displays a table with job titles, role IDs, associated department, and salaries.
View All Employees: Displays a table with employee IDs, first names, last names, job titles, departments, salaries, and managers.
Add a Department: Prompts the user to enter the name of a department and adds it to the database.
Add a Role: Prompts the user to enter the name, salary, and department for a role and adds it to the database.
Add an Employee: Prompts the user to enter the employee's first name, last name, role, and manager, and adds the employee to the database.
Update Employee Role: Allows the user to select an employee and update their role.
Delete Department, Role, or Employee: Provides options to delete a department, role, or employee from the database after confirming dependencies are resolved.
Installation
To install and set up the project, follow these steps:

Clone the Repository:

bash
Copy code
git clone <repository-url>
cd employee-tracker
Install Dependencies:

Install the required packages using npm:

bash
Copy code
npm install
Set Up PostgreSQL Database:

Ensure that you have PostgreSQL installed and running on your system. Use the provided schema.sql file to create the necessary database structure and seeds.sql to populate the database with some initial data.

bash
Copy code
psql -U postgres -f schema.sql
psql -U postgres -f seeds.sql
Make sure to replace postgres with your PostgreSQL username.

Configure Environment Variables:

Create a .env file in the root of your project and add your PostgreSQL connection details:

env
Copy code
DB_USER=your_username
DB_HOST=localhost
DB_NAME=company
DB_PASSWORD=your_password
DB_PORT=5432
Replace your_username, your_password, and other values with your actual PostgreSQL credentials.

Usage
To run the application in normal mode:

bash
Copy code
npm start
To run the application in development mode with automatic restarts using nodemon:

bash
Copy code
npm run dev
Walkthrough Video
For a detailed walkthrough of the application and its features, watch the Demo Video.

Technologies Used
Node.js: JavaScript runtime environment for building server-side applications.
Inquirer.js: A collection of common interactive command-line user interfaces.
PostgreSQL: A powerful, open-source object-relational database system.
Chalk: A terminal string styling library to make the command-line output more readable.
Figlet: A text-to-ASCII art generator to create stylish headings for the CLI interface.
Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.