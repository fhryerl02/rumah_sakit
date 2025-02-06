const express = require('express');
const router = express.Router();
const dokterController = require('../controllers/dokterController');

router.get('/', dokterController.index); // Halaman utama data dokter
router.get('/create', dokterController.create); // Halaman tambah dokter
router.post('/store', dokterController.store); // Simpan data dokter baru
router.get('/edit/:id', dokterController.edit); // Halaman edit dokter
router.post('/update/:id', dokterController.update); // Perbarui data dokter
router.get('/delete/:id', dokterController.destroy); // Hapus data dokter

module.exports = router;