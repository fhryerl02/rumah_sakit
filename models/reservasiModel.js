const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Mendapatkan semua data reservasi
const getAllReservasi = async () => {
    const [rows] = await pool.query(`
        SELECT r.id_reservasi, p.nama_pasien, pl.nama_poli, d.nama_dokter, a.no_antrian, a.tanggal, a.jam
        FROM reservasi r
        JOIN pasien p ON r.no_rm = p.no_rm
        JOIN poli pl ON r.id_poli = pl.id_poli
        JOIN dokter d ON r.id_dokter = d.id_dokter
        JOIN antri a ON r.no_antrian = a.no_antrian
    `);
    return rows;
};

// Mendapatkan data reservasi berdasarkan ID
const getReservasiById = async (id) => {
    const [rows] = await pool.query(`
        SELECT * FROM reservasi WHERE id_reservasi = ?
    `, [id]);
    return rows[0];
};

// Menambahkan data reservasi baru
const createReservasi = async (data) => {
    const { no_rm, id_poli, id_dokter, no_antrian } = data;
    await pool.query(
        'INSERT INTO reservasi (no_rm, id_poli, id_dokter, no_antrian) VALUES (?, ?, ?, ?)',
        [no_rm, id_poli, id_dokter, no_antrian]
    );
};

// Memperbarui data reservasi
const updateReservasi = async (id, data) => {
    const { no_rm, id_poli, id_dokter, no_antrian } = data;
    await pool.query(
        'UPDATE reservasi SET no_rm = ?, id_poli = ?, id_dokter = ?, no_antrian = ? WHERE id_reservasi = ?',
        [no_rm, id_poli, id_dokter, no_antrian, id]
    );
};

// Menghapus data reservasi
const deleteReservasi = async (id) => {
    await pool.query('DELETE FROM reservasi WHERE id_reservasi = ?', [id]);
};

module.exports = {
    getAllReservasi,
    getReservasiById,
    createReservasi,
    updateReservasi,
    deleteReservasi
};