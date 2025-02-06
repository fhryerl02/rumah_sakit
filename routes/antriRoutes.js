const express = require('express');
const router = express.Router();
const antriController = require('../controllers/antriController');

router.get('/', antriController.index); // Halaman utama data antrian
router.get('/create', antriController.create); // Halaman tambah antrian
router.post('/store', antriController.store); // Simpan data antrian baru
router.get('/edit/:no_antrian', antriController.edit); // Halaman edit antrian
router.post('/update/:no_antrian', antriController.update); // Perbarui data antrian
router.get('/delete/:no_antrian', antriController.destroy); // Hapus data antrian

module.exports = router;