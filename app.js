const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // Import library
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine dan path ke folder views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Gunakan express-ejs-layouts
app.use(expressLayouts);

// Default Route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', layout: 'layouts/layout' });
});

// Routes
const pegawaiRoutes = require('./routes/pegawaiRoutes');
const dokterRoutes = require('./routes/dokterRoutes');
const poliRoutes = require('./routes/poliRoutes');
const pasienRoutes = require('./routes/pasienRoutes');
const antriRoutes = require('./routes/antriRoutes');
const reservasiRoutes = require('./routes/reservasiRoutes');
const pembayaranRoutes = require('./routes/pembayaranRoutes');

app.use('/pegawai', pegawaiRoutes);
app.use('/dokter', dokterRoutes);
app.use('/poli', poliRoutes);
app.use('/pasien', pasienRoutes);
app.use('/antri', antriRoutes);
app.use('/reservasi', reservasiRoutes);
app.use('/pembayaran', pembayaranRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});