const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sys1',
    database: 'client1',
});

module.exports = pool.promise();