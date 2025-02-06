const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Mendapatkan semua data pasien
const getAllPasien = async () => {
    const [rows] = await pool.query('SELECT * FROM pasien');
    return rows;
};

// Mendapatkan data pasien berdasarkan nomor rekam medis (no_rm)
const getPasienById = async (no_rm) => {
    const [rows] = await pool.query('SELECT * FROM pasien WHERE no_rm = ?', [no_rm]);
    return rows[0];
};

// Menambahkan data pasien baru
const createPasien = async (data) => {
    const { no_rm, ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung } = data;
    await pool.query(
        'INSERT INTO pasien (no_rm, ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [no_rm, ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung]
    );
};

// Memperbarui data pasien
const updatePasien = async (no_rm, data) => {
    const { ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung } = data;
    await pool.query(
        'UPDATE pasien SET ktp = ?, nama_pasien = ?, tgl_lahir = ?, alamat = ?, tinggi = ?, berat = ?, ibu_kandung = ? WHERE no_rm = ?',
        [ktp, nama_pasien, tgl_lahir, alamat, tinggi, berat, ibu_kandung, no_rm]
    );
};

// Menghapus data pasien
const deletePasien = async (no_rm) => {
    await pool.query('DELETE FROM pasien WHERE no_rm = ?', [no_rm]);
};

module.exports = {
    getAllPasien,
    getPasienById,
    createPasien,
    updatePasien,
    deletePasien
};