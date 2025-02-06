const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Mendapatkan semua data pembayaran
const getAllPembayaran = async () => {
    const [rows] = await pool.query(`
        SELECT p.id_pembayaran, a.no_antrian, a.tanggal, a.jam, p.tipe_pembayaran, p.nama_instansi
        FROM pembayaran p
        JOIN antri a ON p.no_antrian = a.no_antrian
    `);
    return rows;
};

// Mendapatkan data pembayaran berdasarkan ID
const getPembayaranById = async (id) => {
    const [rows] = await pool.query(`
        SELECT * FROM pembayaran WHERE id_pembayaran = ?
    `, [id]);
    return rows[0];
};

// Menambahkan data pembayaran baru
const createPembayaran = async (data) => {
    const { id_pembayaran, no_antrian, tipe_pembayaran, nama_instansi } = data;
    await pool.query(
        'INSERT INTO pembayaran (id_pembayaran, no_antrian, tipe_pembayaran, nama_instansi) VALUES (?, ?, ?, ?)',
        [id_pembayaran, no_antrian, tipe_pembayaran, nama_instansi]
    );
};

// Memperbarui data pembayaran
const updatePembayaran = async (id, data) => {
    const { no_antrian, tipe_pembayaran, nama_instansi } = data;
    await pool.query(
        'UPDATE pembayaran SET no_antrian = ?, tipe_pembayaran = ?, nama_instansi = ? WHERE id_pembayaran = ?',
        [no_antrian, tipe_pembayaran, nama_instansi, id]
    );
};

// Menghapus data pembayaran
const deletePembayaran = async (id) => {
    await pool.query('DELETE FROM pembayaran WHERE id_pembayaran = ?', [id]);
};

module.exports = {
    getAllPembayaran,
    getPembayaranById,
    createPembayaran,
    updatePembayaran,
    deletePembayaran
};