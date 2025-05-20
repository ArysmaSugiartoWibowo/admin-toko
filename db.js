const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // sesuaikan jika ada
    database: 'admin_toko'
});

conn.connect(err => {
    if (err) throw err;
    console.log('Terkoneksi ke database MySQL!');
});

module.exports = conn;
