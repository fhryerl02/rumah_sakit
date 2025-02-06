const express = require('express');
const router = express.Router();
const pegawaiController = require('../controllers/pegawaiController');

router.get('/', pegawaiController.index); // Halaman utama data pegawai
router.get('/create', pegawaiController.create); // Halaman tambah pegawai
router.post('/store', pegawaiController.store); // Simpan data pegawai baru
router.get('/edit/:id', pegawaiController.edit); // Halaman edit pegawai
router.post('/update/:id', pegawaiController.update); // Perbarui data pegawai
router.get('/delete/:id', pegawaiController.destroy); // Hapus data pegawai

module.exports = router;