const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contractorRoutes = require('./routes/contractorRoutes');
const workerRoutes = require('./routes/workerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/contractor', contractorRoutes);
app.use('/worker', workerRoutes);
app.use('/supplier', supplierRoutes);

// Home route
app.get('/', (req, res) => {
    if (req.cookies.userId && req.cookies.userRole) {
        return res.redirect(`/${req.cookies.userRole}/dashboard`);
    }
    res.redirect('/login');
});

// Error handling
app.use((req, res) => {
    res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
