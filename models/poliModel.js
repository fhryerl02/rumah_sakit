const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Mendapatkan semua data poli
const getAllPoli = async () => {
    const [rows] = await pool.query(`
        SELECT p.id_poli, p.nama_poli, pg.id_pegawai, pg.nama_pegawai 
        FROM poli p
        JOIN pegawai pg ON p.id_pegawai = pg.id_pegawai
    `);
    return rows;
};

// Mendapatkan data poli berdasarkan ID
const getPoliById = async (id) => {
    const [rows] = await pool.query(`
        SELECT id_poli, nama_poli, id_pegawai 
        FROM poli 
        WHERE id_poli = ?
    `, [id]);
    return rows[0];
};

// Menambahkan data poli baru
const createPoli = async (data) => {
    const { id_pegawai, nama_poli } = data;
    await pool.query(
        'INSERT INTO poli (id_pegawai, nama_poli) VALUES (?, ?)',
        [id_pegawai, nama_poli]
    );
};

// Memperbarui data poli
const updatePoli = async (id, data) => {
    const { id_pegawai, nama_poli } = data;
    await pool.query(
        'UPDATE poli SET id_pegawai = ?, nama_poli = ? WHERE id_poli = ?',
        [id_pegawai, nama_poli, id]
    );
};

// Menghapus data poli
const deletePoli = async (id) => {
    await pool.query('DELETE FROM poli WHERE id_poli = ?', [id]);
};

module.exports = {
    getAllPoli,
    getPoliById,
    createPoli,
    updatePoli,
    deletePoli
};