const express = require('express');
const router = express.Router();
const contractorController = require('../controllers/contractorController');
const { requireRole } = require('../middleware/auth');

router.get('/dashboard', requireRole('contractor'), contractorController.dashboard);
router.get('/add-project', requireRole('contractor'), contractorController.showAddProject);
router.post('/add-project', requireRole('contractor'), contractorController.addProject);
router.get('/applications', requireRole('contractor'), contractorController.viewApplications);
router.post('/applications/update', requireRole('contractor'), contractorController.updateApplicationStatus);
router.get('/materials', requireRole('contractor'), contractorController.viewMaterials);
router.post('/materials/request', requireRole('contractor'), contractorController.requestMaterial);
router.get('/material-requests', requireRole('contractor'), contractorController.viewMaterialRequests);

module.exports = router;
