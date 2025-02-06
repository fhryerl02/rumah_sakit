const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Mendapatkan semua data pegawai
const getAllPegawai = async () => {
    const [rows] = await pool.query('SELECT * FROM pegawai');
    return rows;
};

// Mendapatkan data pegawai berdasarkan ID
const getPegawaiById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM pegawai WHERE id_pegawai = ?', [id]);
    return rows[0];
};

// Menambahkan data pegawai baru
const createPegawai = async (data) => {
    const { id_pegawai, nama_pegawai, status_pegawai, gaji } = data;
    await pool.query(
        'INSERT INTO pegawai (id_pegawai, nama_pegawai, status_pegawai, gaji) VALUES (?, ?, ?, ?)',
        [id_pegawai, nama_pegawai, status_pegawai, gaji]
    );
};

// Memperbarui data pegawai
const updatePegawai = async (id, data) => {
    const { nama_pegawai, status_pegawai, gaji } = data;
    await pool.query(
        'UPDATE pegawai SET nama_pegawai = ?, status_pegawai = ?, gaji = ? WHERE id_pegawai = ?',
        [nama_pegawai, status_pegawai, gaji, id]
    );
};

// Menghapus data pegawai
const deletePegawai = async (id) => {
    await pool.query('DELETE FROM pegawai WHERE id_pegawai = ?', [id]);
};

module.exports = {
    getAllPegawai,
    getPegawaiById,
    createPegawai,
    updatePegawai,
    deletePegawai
};