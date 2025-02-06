const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayaranController');

router.get('/', pembayaranController.index); // Halaman utama data pembayaran
router.get('/create', pembayaranController.create); // Halaman tambah pembayaran
router.post('/store', pembayaranController.store); // Simpan data pembayaran baru
router.get('/edit/:id', pembayaranController.edit); // Halaman edit pembayaran
router.post('/update/:id', pembayaranController.update); // Perbarui data pembayaran
router.get('/delete/:id', pembayaranController.destroy); // Hapus data pembayaran

module.exports = router;