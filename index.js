const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

//main menu
function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }
    ])
        .then((results) => {
            let option = results.options;
            if (option === 'View all departments') {
                viewDepartments();
            } else if (option === 'View all roles') {
                viewRoles();
            } else if (option === 'View all employees') {
                viewEmployees();
            } else if (option === 'Add a department') {
                addDepartment();
            } else if (option === 'Add a role') {
                addRole();
            } else if (option === 'Add an employee') {
                addEmployee();
            } else if (option === 'Update an employee role') {
                updateRole();
            } else if (option === "View a department's budget") {
                viewBudget();
            }
            else {
                quitMenu();
            }
        })
}

//shows the department table
function viewDepartments() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

//shows the role table
function viewRoles() {
    db.query('SELECT * FROM role', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

//shows the employee table
function viewEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

//allows the user to add a new department to the department table
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter a department name.'
        }
    ])
        .then((answer) =>
            db.promise().query('INSERT INTO department (name) VALUES (?)', answer.newDepartment, (err, result) => {
                if (err) throw err
                console.table(result);
            })).then(() => {
                menu();
            })
}

//allows the user to add a new role to the role table
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is this new role?'
        },
        {
            type: 'input',
            name: 'newSalary',
            message: "What is this new role's salary?"
        },
        {
            type: 'list',
            name: 'whichDepartment',
            message: 'What is the department id? 1=Sales, 2=Engineering, 3=Finance, 4=Legal',
            choices: ['1', '2', '3', '4']
        }
    ])
        .then((answers) =>
            db.promise().query('INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)', [answers.newRole, answers.newSalary, answers.whichDepartment], (err, result) => {
                if (err) throw err
                console.table(result);
            })).then(() => {
                menu();
            })
}

//allows the user to add a new employee to the employee table
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newEmployeeFirst',
            message: "Please enter the new employee's first name."
        },
        {
            type: 'input',
            name: 'newEmployeeLast',
            message: "Please enter the new employee's last name."
        },
        {
            type: 'list',
            name: 'newEmployeeRole',
            message: "Please choose the new employee's role id.",
            choices: ['1', '2', '3', '4', '5', '6', '7', '8']
        }
    ])
        .then((answers) =>
            db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.newEmployeeFirst, answers.newEmployeeLast, answers.newEmployeeRole, answers.newEmployeeManager], (err, result) => {
                if (err) throw err
            })).then(() => {
                menu();
            })
}

//allows a user to update an existing employee's role
function updateRole() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'chooseEmployee',
            message: 'Choose the id of the employee you would like to update.',
            choices: ['1', '2', '3', '4', '5', '6', '7', '8']
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Choose the id of their new role',
            choices: ['1', '2', '3', '4', '5', '6', '7', '8']
        }
    ])
        .then((answers) =>
            db.promise().query('UPDATE employee SET role_id=? WHERE id=?', [answers.newRole, answers.chooseEmployee], (err, result) => {
                if (err) throw err
                console.table(result);
            })).then(() => {
                menu();
            })
}


//allows the user to exit the app
function quitMenu() {
    console.log("Thank you for using Arlene's Employee Tracker. Goodbye!");
    process.exit();
}

menu();