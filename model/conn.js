var mysql = require('mysql2')
var util = require('util')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'college-website',
    port: 3306
});

var exe = util.promisify(conn.query).bind(conn);

conn.connect((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully');
});

module.exports = exe;

