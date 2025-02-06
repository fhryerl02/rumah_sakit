const { getAllPembayaran, getPembayaranById, createPembayaran, updatePembayaran, deletePembayaran } = require('../models/pembayaranModel');
const antriModel = require('../models/antriModel');

exports.index = async (req, res) => {
    const pembayaran = await getAllPembayaran();
    console.log('Pembayaran Data:', pembayaran); // Log data pembayaran
    res.render('pembayaran/index', { title: 'Data Pembayaran', layout: 'layouts/layout', pembayaran });
};

exports.create = async (req, res) => {
    // Ambil data antrian untuk dropdown
    const [antri] = await antriModel.getAllAntri();
    console.log('Antri Data:', antri); // Log data antri
    res.render('pembayaran/create', { title: 'Tambah Pembayaran', layout: 'layouts/layout', antri });
};

exports.store = async (req, res) => {
    console.log('Store Data:', req.body); // Log data yang dikirim
    await createPembayaran(req.body);
    res.redirect('/pembayaran');
};

exports.edit = async (req, res) => {
    const pembayaran = await getPembayaranById(req.params.id);
    console.log('Pembayaran Detail:', pembayaran); // Log detail pembayaran
    const [antri] = await antriModel.getAllAntri();
    console.log('Antri Data:', antri); // Log data antri
    res.render('pembayaran/edit', { title: 'Edit Pembayaran', layout: 'layouts/layout', pembayaran, antri });
};

exports.update = async (req, res) => {
    console.log('Update Data:', req.body); // Log data yang dikirim
    await updatePembayaran(req.params.id, req.body);
    res.redirect('/pembayaran');
};

exports.destroy = async (req, res) => {
    console.log('Delete ID:', req.params.id); // Log ID yang dihapus
    await deletePembayaran(req.params.id);
    res.redirect('/pembayaran');
};