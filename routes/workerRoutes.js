const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');
const { requireRole } = require('../middleware/auth');

router.get('/dashboard', requireRole('worker'), workerController.dashboard);
router.get('/jobs', requireRole('worker'), workerController.viewJobs);
router.post('/jobs/apply', requireRole('worker'), workerController.applyToJob);

module.exports = router;
