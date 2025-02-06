const { getAllDokter, getDokterById, createDokter, updateDokter, deleteDokter } = require('../models/dokterModel');
const pegawaiModel = require('../models/pegawaiModel');

exports.index = async (req, res) => {
    const dokter = await getAllDokter();
    console.log('Dokter Data:', dokter); // Log data dokter
    res.render('dokter/index', { title: 'Data Dokter', layout: 'layouts/layout', dokter });
};

exports.create = async (req, res) => {
    // Ambil data pegawai untuk dropdown
    const pegawai = await pegawaiModel.getAllPegawai();
    console.log('Pegawai Data:', pegawai); // Log data pegawai
    res.render('dokter/create', { title: 'Tambah Dokter', layout: 'layouts/layout', pegawai });
};

exports.store = async (req, res) => {
    console.log('Store Data:', req.body); // Log data yang dikirim
    await createDokter(req.body);
    res.redirect('/dokter');
};

exports.edit = async (req, res) => {
    const dokter = await getDokterById(req.params.id);
    console.log('Dokter Detail:', dokter); // Log detail dokter
    const pegawai = await pegawaiModel.getAllPegawai();
    console.log('Pegawai Data:', pegawai); // Log data pegawai
    res.render('dokter/edit', { title: 'Edit Dokter', layout: 'layouts/layout', dokter, pegawai });
};

exports.update = async (req, res) => {
    console.log('Update Data:', req.body); // Log data yang dikirim
    await updateDokter(req.params.id, req.body);
    res.redirect('/dokter');
};

exports.destroy = async (req, res) => {
    console.log('Delete ID:', req.params.id); // Log ID yang dihapus
    await deleteDokter(req.params.id);
    res.redirect('/dokter');
};