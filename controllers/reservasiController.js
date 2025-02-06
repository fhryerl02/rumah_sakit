const { getAllReservasi, getReservasiById, createReservasi, updateReservasi, deleteReservasi } = require('../models/reservasiModel');
const pasienModel = require('../models/pasienModel');
const poliModel = require('../models/poliModel');
const dokterModel = require('../models/dokterModel');
const antriModel = require('../models/antriModel');

exports.index = async (req, res) => {
    const reservasi = await getAllReservasi();
    console.log('Reservasi Data:', reservasi); // Log data reservasi
    res.render('reservasi/index', { title: 'Data Reservasi', layout: 'layouts/layout', reservasi });
};

exports.create = async (req, res) => {
    // Ambil data pasien, poli, dokter, dan antrian untuk dropdown
    const [pasien] = await pasienModel.getAllPasien();
    const [poli] = await poliModel.getAllPoli();
    const [dokter] = await dokterModel.getAllDokter();
    const [antri] = await antriModel.getAllAntri();
    console.log('Pasien Data:', pasien); // Log data pasien
    console.log('Poli Data:', poli); // Log data poli
    console.log('Dokter Data:', dokter); // Log data dokter
    console.log('Antri Data:', antri); // Log data antri
    res.render('reservasi/create', { title: 'Tambah Reservasi', layout: 'layouts/layout', pasien, poli, dokter, antri });
};

exports.store = async (req, res) => {
    console.log('Store Data:', req.body); // Log data yang dikirim
    await createReservasi(req.body);
    res.redirect('/reservasi');
};

exports.edit = async (req, res) => {
    const reservasi = await getReservasiById(req.params.id);
    console.log('Reservasi Detail:', reservasi); // Log detail reservasi
    const [pasien] = await pasienModel.getAllPasien();
    const [poli] = await poliModel.getAllPoli();
    const [dokter] = await dokterModel.getAllDokter();
    const [antri] = await antriModel.getAllAntri();
    console.log('Pasien Data:', pasien); // Log data pasien
    console.log('Poli Data:', poli); // Log data poli
    console.log('Dokter Data:', dokter); // Log data dokter
    console.log('Antri Data:', antri); // Log data antri
    res.render('reservasi/edit', { title: 'Edit Reservasi', layout: 'layouts/layout', reservasi, pasien, poli, dokter, antri });
};

exports.update = async (req, res) => {
    console.log('Update Data:', req.body); // Log data yang dikirim
    await updateReservasi(req.params.id, req.body);
    res.redirect('/reservasi');
};

exports.destroy = async (req, res) => {
    console.log('Delete ID:', req.params.id); // Log ID yang dihapus
    await deleteReservasi(req.params.id);
    res.redirect('/reservasi');
};