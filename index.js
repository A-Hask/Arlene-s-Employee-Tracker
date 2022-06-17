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
    db.query('INSERT INTO department WHERE id=?', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

function addRole() {
    db.query('INSERT INTO role WHERE id=?', (err, result) => {
        if (err) throw err
        console.table(result);
        menu();
    })
}

function addEmployee() {
    db.query('INSERT INTO employee WHERE id=?', (err, result) => {
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