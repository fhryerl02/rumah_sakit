const express = require('express');
const router = express.Router();
const reservasiController = require('../controllers/reservasiController');

router.get('/', reservasiController.index); // Halaman utama data reservasi
router.get('/create', reservasiController.create); // Halaman tambah reservasi
router.post('/store', reservasiController.store); // Simpan data reservasi baru
router.get('/edit/:id', reservasiController.edit); // Halaman edit reservasi
router.post('/update/:id', reservasiController.update); // Perbarui data reservasi
router.get('/delete/:id', reservasiController.destroy); // Hapus data reservasi

module.exports = router;