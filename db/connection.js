const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Wh!sp3rR0ll!',
    database: 'employees'
  });

  module.exports = db;
  