const { getAllPasien, getPasienById, createPasien, updatePasien, deletePasien } = require('../models/pasienModel');

exports.index = async (req, res) => {
    const pasien = await getAllPasien();
    res.render('pasien/index', { title: 'Data Pasien', layout: 'layouts/layout', pasien });
};

exports.create = (req, res) => {
    res.render('pasien/create', { title: 'Tambah Pasien', layout: 'layouts/layout' });
};

exports.store = async (req, res) => {
    await createPasien(req.body);
    res.redirect('/pasien');
};

exports.edit = async (req, res) => {
    const pasien = await getPasienById(req.params.no_rm);
    res.render('pasien/edit', { title: 'Edit Pasien', layout: 'layouts/layout', pasien });
};

exports.update = async (req, res) => {
    await updatePasien(req.params.no_rm, req.body);
    res.redirect('/pasien');
};

exports.destroy = async (req, res) => {
    await deletePasien(req.params.no_rm);
    res.redirect('/pasien');
};