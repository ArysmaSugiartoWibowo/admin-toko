# 🛍️ Admin Toko - Aplikasi Pembelian & Pembatalan Produk

Sistem admin toko sederhana berbasis **Node.js**, **Express.js**, **EJS**, dan **MySQL**. Aplikasi ini memungkinkan admin untuk mencatat pembelian produk, menampilkan daftar pembelian, dan membatalkan pembelian yang sudah dilakukan. Tampilan dibuat menggunakan **Bootstrap 5** agar responsif dan rapi.

---

## 📌 Fitur Utama

- ✅ Formulir pembelian produk oleh admin
- ✅ Total harga otomatis dari harga produk × jumlah
- ✅ Tabel daftar pembelian
- ✅ Opsi pembatalan pembelian oleh admin
- ✅ Tampilan rapi dengan Bootstrap

---

## 🧰 Teknologi yang Digunakan

| Teknologi     | Fungsi                                                                 |
|---------------|------------------------------------------------------------------------|
| **Node.js**   | Menjalankan server dengan JavaScript                                   |
| **Express.js**| Framework backend ringan untuk routing                                 |
| **EJS**       | Template engine untuk rendering HTML dinamis                           |
| **MySQL**     | Menyimpan data produk, stok, dan pembelian                             |
| **Bootstrap** | Framework CSS untuk tampilan modern dan responsif                      |

---

## 🗂️ Struktur Folder

admin-toko/
├── views/ # Template HTML menggunakan EJS
│ └── index.ejs
├── db.js # Konfigurasi koneksi ke MySQL
├── app.js # File utama Express server
├── package.json # Dependency dan konfigurasi aplikasi
└── README.md # Dokumentasi proyek


---

## ⚙️ Langkah Instalasi & Menjalankan

### 1. Install Node.js & MySQL
Pastikan kamu sudah menginstal:

- [Node.js](https://nodejs.org)
- MySQL Server (bisa pakai XAMPP, Laragon, atau MySQL langsung)

---
## jika file database tidak dapat di expert buat saja seperi sql dibawah
CREATE DATABASE admin_toko;
USE admin_toko;

-- Tabel produk
CREATE TABLE produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    harga INT
);

-- Tambah 10 produk
INSERT INTO produk (nama, harga) VALUES
('Kopi', 10000), ('Teh', 5000), ('Gula', 8000),
('Beras', 12000), ('Susu', 15000), ('Minyak', 14000),
('Mie Instan', 3000), ('Kecap', 6000), ('Sabun', 7000), ('Shampo', 11000);

-- Tabel stok (opsional)
CREATE TABLE stok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_produk INT,
    stok INT,
    FOREIGN KEY (id_produk) REFERENCES produk(id)
);

-- Tabel pembelian
CREATE TABLE pembelian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_produk INT,
    jumlah INT,
    total_harga INT,
    status ENUM('dibeli', 'dibatalkan') DEFAULT 'dibeli',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_produk) REFERENCES produk(id)
);
## cara menjalankan cukup running
node app.js
dan buka localhost:3000