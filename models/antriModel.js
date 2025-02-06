const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Mendapatkan semua data antrian
const getAllAntri = async () => {
    const [rows] = await pool.query('SELECT * FROM antri');
    return rows;
};

// Mendapatkan data antrian berdasarkan nomor antrian (no_antrian)
const getAntriById = async (no_antrian) => {
    const [rows] = await pool.query('SELECT * FROM antri WHERE no_antrian = ?', [no_antrian]);
    return rows[0];
};

// Menambahkan data antrian baru
const createAntri = async (data) => {
    const { no_antrian, tanggal, hari, jam } = data;
    await pool.query(
        'INSERT INTO antri (no_antrian, tanggal, hari, jam) VALUES (?, ?, ?, ?)',
        [no_antrian, tanggal, hari, jam]
    );
};

// Memperbarui data antrian
const updateAntri = async (no_antrian, data) => {
    const { tanggal, hari, jam } = data;
    await pool.query(
        'UPDATE antri SET tanggal = ?, hari = ?, jam = ? WHERE no_antrian = ?',
        [tanggal, hari, jam, no_antrian]
    );
};

// Menghapus data antrian
const deleteAntri = async (no_antrian) => {
    await pool.query('DELETE FROM antri WHERE no_antrian = ?', [no_antrian]);
};

module.exports = {
    getAllAntri,
    getAntriById,
    createAntri,
    updateAntri,
    deleteAntri
};