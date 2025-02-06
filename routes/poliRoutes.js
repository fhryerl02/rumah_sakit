const express = require('express');
const router = express.Router();
const poliController = require('../controllers/poliController');

router.get('/', poliController.index); // Halaman utama data poli
router.get('/create', poliController.create); // Halaman tambah poli
router.post('/store', poliController.store); // Simpan data poli baru
router.get('/edit/:id', poliController.edit); // Halaman edit poli
router.post('/update/:id', poliController.update); // Perbarui data poli
router.get('/delete/:id', poliController.destroy); // Hapus data poli

module.exports = router;