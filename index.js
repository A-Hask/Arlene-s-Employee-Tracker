const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');


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
            } else {
                quitMenu();
            }
        })
}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

function viewRoles() {
    db.query('SELECT * FROM role', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please enter a department name.'
        }
    ]);
    db.query('INSERT INTO department', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

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
            type: 'input',
            name: 'whichDepartment',
            message:  'What department is this new role in?'
        }
    ]);
    db.query('INSERT INTO role', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

function addEmployee() {
    db.query('INSERT INTO employee', (err, result) => {
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
                type: 'input',
                name: 'newEmployeeRole',
                message: "Please enter the new employee's role."
            },
            {
                type: 'input',
                name: 'newEmployeeManager',
                message: "Please enter the new employee's manager."
            }
        ]);
        if (err) throw err
        console.table(result);
        menu();
    })

}

function updateRole() {
    db.query('UPDATE role WHERE id=?', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

function quitMenu() {
    console.log("Thank you for using Arlene's Employee Tracker. Goodbye!");
    process.exit();
}

menu();