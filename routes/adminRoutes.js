const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireRole } = require('../middleware/auth');

router.get('/dashboard', requireRole('admin'), adminController.dashboard);

module.exports = router;
