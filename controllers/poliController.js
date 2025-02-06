const { getAllPoli, getPoliById, createPoli, updatePoli, deletePoli } = require('../models/poliModel');
const pegawaiModel = require('../models/pegawaiModel');

exports.index = async (req, res) => {
    const poli = await getAllPoli();
    console.log('Poli Data:', poli); // Log data poli
    res.render('poli/index', { title: 'Data Poli', layout: 'layouts/layout', poli });
};

exports.create = async (req, res) => {
    // Ambil data pegawai untuk dropdown
    const pegawai = await pegawaiModel.getAllPegawai();
    console.log('Pegawai Data:', pegawai); // Log data pegawai
    res.render('poli/create', { title: 'Tambah Poli', layout: 'layouts/layout', pegawai });
};

exports.store = async (req, res) => {
    console.log('Store Data:', req.body); // Log data yang dikirim
    await createPoli(req.body);
    res.redirect('/poli');
};

exports.edit = async (req, res) => {
    const poli = await getPoliById(req.params.id);
    console.log('Poli Detail:', poli); // Log detail poli
    const pegawai = await pegawaiModel.getAllPegawai();
    console.log('Pegawai Data:', pegawai); // Log data pegawai
    res.render('poli/edit', { title: 'Edit Poli', layout: 'layouts/layout', poli, pegawai });
};

exports.update = async (req, res) => {
    console.log('Update Data:', req.body); // Log data yang dikirim
    await updatePoli(req.params.id, req.body);
    res.redirect('/poli');
};

exports.destroy = async (req, res) => {
    console.log('Delete ID:', req.params.id); // Log ID yang dihapus
    await deletePoli(req.params.id);
    res.redirect('/poli');
};