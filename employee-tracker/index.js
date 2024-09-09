import pkg from 'pg';  // Import 'pg' as a package
import inquirer from 'inquirer';
import chalk from 'chalk';  // Use import instead of require
import figlet from 'figlet';

const { Client } = pkg;  // Destructure Client from the default import

// PostgreSQL client setup
const client = new Client({
  user: 'postgres',  // Replace with your actual PostgreSQL username
  host: 'localhost',
  database: 'company',  // Make sure this is your actual database name
  password: '2264',  // Replace with the correct password
  port: 5432
});

client.connect();

// Display ASCII art header using figlet
function showBanner() {
  console.log(
    chalk.yellow(
      figlet.textSync('Employee Manager', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
}

// Main Menu
async function mainMenu() {
  showBanner();  // Show the ASCII art header

  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: chalk.blueBright('What would you like to do?'),  // Add color to the message
      choices: [
        chalk.green('View All Employees'),
        chalk.green('Add Employee'),
        chalk.green('Update Employee Role'),
        chalk.green('View All Roles'),
        chalk.green('Add Role'),
        chalk.green('View All Departments'),
        chalk.green('Add Department'),
        chalk.red('Exit')
      ],
    },
  ]);

  // Remove chalk formatting to match function names
  switch (choice.replace(/\x1B\[\d+m/g, '')) {  // Remove color formatting for comparisons
    case 'View All Employees':
      await viewEmployees();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      break;
    case 'View All Roles':
      await viewRoles();
      break;
    case 'Add Role':
      await addRole();
      break;
    case 'View All Departments':
      await viewDepartments();
      break;
    case 'Add Department':
      await addDepartment();
      break;
    case 'Exit':
      client.end();
      console.log(chalk.red('Goodbye!'));
      process.exit();
  }
}

// Function to view all employees
async function viewEmployees() {
  try {
    const res = await client.query('SELECT * FROM employee;');
    console.table(res.rows);
    mainMenu();  // Return to main menu after displaying the result
  } catch (error) {
    console.error(chalk.red('Error viewing employees:'), error);
  }
}

// Function to add an employee
async function addEmployee() {
  try {
    const rolesRes = await client.query('SELECT id, title FROM role;');
    const roles = rolesRes.rows.map(role => ({ name: role.title, value: role.id }));

    const employeesRes = await client.query('SELECT id, first_name, last_name FROM employee;');
    const managers = employeesRes.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    managers.push({ name: 'None', value: null });  // Add a 'None' option for no manager

    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      { type: 'input', name: 'firstName', message: 'Enter employee first name:' },
      { type: 'input', name: 'lastName', message: 'Enter employee last name:' },
      { type: 'list', name: 'roleId', message: 'Select employee role:', choices: roles },
      { type: 'list', name: 'managerId', message: 'Select employee manager:', choices: managers }
    ]);

    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);', [firstName, lastName, roleId, managerId]);
    console.log(chalk.green('Employee added successfully.'));
    mainMenu();  // Return to main menu
  } catch (error) {
    console.error(chalk.red('Error adding employee:'), error);
  }
}

// Function to update an employee's role
async function updateEmployeeRole() {
  try {
    const employeesRes = await client.query('SELECT id, first_name, last_name FROM employee;');
    const employees = employeesRes.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const rolesRes = await client.query('SELECT id, title FROM role;');
    const roles = rolesRes.rows.map(role => ({ name: role.title, value: role.id }));

    const { employeeId, newRoleId } = await inquirer.prompt([
      { type: 'list', name: 'employeeId', message: 'Select the employee to update:', choices: employees },
      { type: 'list', name: 'newRoleId', message: 'Select the new role for the employee:', choices: roles }
    ]);

    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2;', [newRoleId, employeeId]);
    console.log(chalk.green('Employee role updated successfully.'));
    mainMenu();  // Return to main menu
  } catch (error) {
    console.error(chalk.red('Error updating employee role:'), error);
  }
}

// Function to view all roles
async function viewRoles() {
  try {
    const res = await client.query('SELECT * FROM role;');
    console.table(res.rows);
    mainMenu();  // Return to main menu
  } catch (error) {
    console.error(chalk.red('Error viewing roles:'), error);
  }
}

// Function to add a role
async function addRole() {
  try {
    const departmentsRes = await client.query('SELECT id, name FROM department;');
    const departments = departmentsRes.rows.map(dept => ({ name: dept.name, value: dept.id }));

    const { title, salary, departmentId } = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Enter role title:' },
      { type: 'input', name: 'salary', message: 'Enter role salary:' },
      { type: 'list', name: 'departmentId', message: 'Select department:', choices: departments }
    ]);

    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);', [title, salary, departmentId]);
    console.log(chalk.green('Role added successfully.'));
    mainMenu();  // Return to main menu
  } catch (error) {
    console.error(chalk.red('Error adding role:'), error);
  }
}

// Function to view all departments
async function viewDepartments() {
  try {
    const res = await client.query('SELECT * FROM department;');
    console.table(res.rows);
    mainMenu();  // Return to main menu
  } catch (error) {
    console.error(chalk.red('Error viewing departments:'), error);
  }
}

// Function to add a department
async function addDepartment() {
  try {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter department name:' }
    ]);

    await client.query('INSERT INTO department (name) VALUES ($1);', [name]);
    console.log(chalk.green('Department added successfully.'));
    mainMenu();  // Return to main menu
  } catch (error) {
    console.error(chalk.red('Error adding department:'), error);
  }
}

// Start the application
mainMenu();








