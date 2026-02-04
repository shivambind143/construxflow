const User = require('../models/User');
const ProjectPost = require('../models/ProjectPost');
const Application = require('../models/Application');
const MaterialRequest = require('../models/MaterialRequest');

exports.dashboard = async (req, res) => {
    try {
        const stats = {
            totalUsers: await User.getTotalCount(),
            totalContractors: await User.getCountByRole('contractor'),
            totalWorkers: await User.getCountByRole('worker'),
            totalSuppliers: await User.getCountByRole('supplier'),
            totalProjects: await ProjectPost.getTotalCount(),
            totalApplications: await Application.getTotalCount(),
            totalMaterialRequests: await MaterialRequest.getTotalCount()
        };

        res.render('admin/dashboard', {
            userName: req.cookies.userName,
            stats
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).send('Server Error');
    }
};
