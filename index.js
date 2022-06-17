const express = require('express');
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
    .then ((results) => {
        let option = results.options;
        if (option === 'View all departments') {
            viewDepartments();
        } else if (option === 'View all roles') {
            viewRoles();
        }
        //etc etc etc
        else if (option === 'Quit') {
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

function quitMenu() {
    console.log('Goodbye');
    process.exit();
}