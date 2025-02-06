const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Mendapatkan semua data dokter
const getAllDokter = async () => {
    const [rows] = await pool.query(`
        SELECT d.id_dokter, d.nama_dokter, d.status_dokter, p.id_pegawai, p.nama_pegawai 
        FROM dokter d
        JOIN pegawai p ON d.id_pegawai = p.id_pegawai
    `);
    return rows;
};

// Mendapatkan data dokter berdasarkan ID
const getDokterById = async (id) => {
    const [rows] = await pool.query(`
        SELECT d.id_dokter, d.nama_dokter, d.status_dokter, d.id_pegawai 
        FROM dokter d
        WHERE d.id_dokter = ?
    `, [id]);
    return rows[0];
};

// Menambahkan data dokter baru
const createDokter = async (data) => {
    const { id_pegawai, nama_dokter, status_dokter } = data;
    await pool.query(
        'INSERT INTO dokter (id_pegawai, nama_dokter, status_dokter) VALUES (?, ?, ?)',
        [id_pegawai, nama_dokter, status_dokter]
    );
};

// Memperbarui data dokter
const updateDokter = async (id, data) => {
    const { id_pegawai, nama_dokter, status_dokter } = data;
    await pool.query(
        'UPDATE dokter SET id_pegawai = ?, nama_dokter = ?, status_dokter = ? WHERE id_dokter = ?',
        [id_pegawai, nama_dokter, status_dokter, id]
    );
};

// Menghapus data dokter
const deleteDokter = async (id) => {
    await pool.query('DELETE FROM dokter WHERE id_dokter = ?', [id]);
};

module.exports = {
    getAllDokter,
    getDokterById,
    createDokter,
    updateDokter,
    deleteDokter
};