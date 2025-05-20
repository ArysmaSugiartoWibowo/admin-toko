const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Tampilkan form pembelian & daftar pembelian
app.get('/', (req, res) => {
    db.query('SELECT produk.*, stock_produk.stok FROM produk JOIN stock_produk ON produk.id = stock_produk.id_produk', (err, produk) => {
        if (err) throw err;
        db.query(`SELECT pembelian.*, produk.nama 
                  FROM pembelian JOIN produk ON pembelian.id_produk = produk.id 
                  ORDER BY pembelian.id DESC`, (err, pembelian) => {
            if (err) throw err;
            res.render('index', { produk, pembelian });
        });
    });
});

// Proses input pembelian
app.post('/beli', (req, res) => {
    const { id_produk, jumlah } = req.body;
    db.query('SELECT harga FROM produk WHERE id = ?', [id_produk], (err, result) => {
        if (err) throw err;
        const harga = result[0].harga;
        const total = harga * jumlah;

        // kurangi stok
        db.query('UPDATE stock_produk SET stok = stok - ? WHERE id_produk = ?', [jumlah, id_produk]);

        db.query('INSERT INTO pembelian (id_produk, jumlah, total_harga) VALUES (?, ?, ?)',
            [id_produk, jumlah, total],
            (err) => {
                if (err) throw err;
                res.redirect('/');
            }
        );
    });
});

// Proses cancel pembelian
app.get('/cancel/:id', (req, res) => {
    const id = req.params.id;
    // Ambil data dulu
    db.query('SELECT * FROM pembelian WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        const pembelian = rows[0];

        // Tambahkan stok kembali
        db.query('UPDATE stock_produk SET stok = stok + ? WHERE id_produk = ?', [pembelian.jumlah, pembelian.id_produk]);
        // Update status
        db.query('UPDATE pembelian SET status = "dibatalkan" WHERE id = ?', [id], (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
