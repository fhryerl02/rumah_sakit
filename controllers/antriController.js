const { getAllAntri, getAntriById, createAntri, updateAntri, deleteAntri } = require('../models/antriModel');

exports.index = async (req, res) => {
    const antri = await getAllAntri();
    res.render('antri/index', { title: 'Data Antrian', layout: 'layouts/layout', antri });
};

exports.create = (req, res) => {
    res.render('antri/create', { title: 'Tambah Antrian', layout: 'layouts/layout' });
};

exports.store = async (req, res) => {
    await createAntri(req.body);
    res.redirect('/antri');
};

exports.edit = async (req, res) => {
    const antri = await getAntriById(req.params.no_antrian);
    res.render('antri/edit', { title: 'Edit Antrian', layout: 'layouts/layout', antri });
};

exports.update = async (req, res) => {
    await updateAntri(req.params.no_antrian, req.body);
    res.redirect('/antri');
};

exports.destroy = async (req, res) => {
    await deleteAntri(req.params.no_antrian);
    res.redirect('/antri');
};