const express = require('express');
const router = express.Router();
const pasienController = require('../controllers/pasienController.js');

router.get('/', pasienController.index); // Halaman utama data pasien
router.get('/create', pasienController.create); // Halaman tambah pasien
router.post('/store', pasienController.store); // Simpan data pasien baru
router.get('/edit/:no_rm', pasienController.edit); // Halaman edit pasien
router.post('/update/:no_rm', pasienController.update); // Perbarui data pasien
router.get('/delete/:no_rm', pasienController.destroy); // Hapus data pasien

module.exports = router;