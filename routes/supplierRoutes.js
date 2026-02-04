const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { requireRole } = require('../middleware/auth');

router.get('/dashboard', requireRole('supplier'), supplierController.dashboard);
router.get('/add-material', requireRole('supplier'), supplierController.showAddMaterial);
router.post('/add-material', requireRole('supplier'), supplierController.addMaterial);
router.get('/requests', requireRole('supplier'), supplierController.viewRequests);
router.post('/requests/update', requireRole('supplier'), supplierController.updateRequestStatus);

module.exports = router;
