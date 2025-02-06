const { getAllPegawai, getPegawaiById, createPegawai, updatePegawai, deletePegawai } = require('../models/pegawaiModel');

exports.index = async (req, res) => {
    const pegawai = await getAllPegawai();
    res.render('pegawai/index', { title: 'Data Pegawai', layout: 'layouts/layout', pegawai });
};

exports.create = (req, res) => {
    res.render('pegawai/create', { title: 'Tambah Pegawai', layout: 'layouts/layout' });
};

exports.store = async (req, res) => {
    await createPegawai(req.body);
    res.redirect('/pegawai');
};

exports.edit = async (req, res) => {
    const pegawai = await getPegawaiById(req.params.id);
    res.render('pegawai/edit', { title: 'Edit Pegawai', layout: 'layouts/layout', pegawai });
};

exports.update = async (req, res) => {
    await updatePegawai(req.params.id, req.body);
    res.redirect('/pegawai');
};

exports.destroy = async (req, res) => {
    await deletePegawai(req.params.id);
    res.redirect('/pegawai');
};