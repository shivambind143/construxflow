const ProjectPost = require('../models/ProjectPost');
const Application = require('../models/Application');
const Material = require('../models/Material');
const MaterialRequest = require('../models/MaterialRequest');

exports.dashboard = async (req, res) => {
    try {
        const projects = await ProjectPost.findByContractorId(req.cookies.userId);
        res.render('contractor/dashboard', {
            userName: req.cookies.userName,
            projects
        });
    } catch (error) {
        console.error('Contractor dashboard error:', error);
        res.status(500).send('Server Error');
    }
};

exports.showAddProject = (req, res) => {
    res.render('contractor/add-project', {
        userName: req.cookies.userName,
        error: null,
        success: null
    });
};

exports.addProject = async (req, res) => {
    try {
        const { description, location, workers_required, worker_type, salary } = req.body;

        if (!description || !location || !workers_required || !worker_type || !salary) {
            return res.render('contractor/add-project', {
                userName: req.cookies.userName,
                error: 'All fields are required',
                success: null
            });
        }

        await ProjectPost.create(
            description,
            location,
            parseInt(workers_required),
            worker_type,
            parseFloat(salary),
            req.cookies.userId
        );

        res.render('contractor/add-project', {
            userName: req.cookies.userName,
            error: null,
            success: 'Project added successfully!'
        });
    } catch (error) {
        console.error('Add project error:', error);
        res.render('contractor/add-project', {
            userName: req.cookies.userName,
            error: 'Failed to add project',
            success: null
        });
    }
};

exports.viewApplications = async (req, res) => {
    try {
        const applications = await Application.findByContractorId(req.cookies.userId);
        res.render('contractor/applications', {
            userName: req.cookies.userName,
            applications
        });
    } catch (error) {
        console.error('View applications error:', error);
        res.status(500).send('Server Error');
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).send('Invalid status');
        }

        await Application.updateStatus(id, status);
        res.redirect('/contractor/applications');
    } catch (error) {
        console.error('Update application error:', error);
        res.status(500).send('Server Error');
    }
};

exports.viewMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll();
        const projects = await ProjectPost.findByContractorId(req.cookies.userId);
        
        res.render('contractor/materials', {
            userName: req.cookies.userName,
            materials,
            projects
        });
    } catch (error) {
        console.error('View materials error:', error);
        res.status(500).send('Server Error');
    }
};

exports.requestMaterial = async (req, res) => {
    try {
        const { material_id, project_post_id, quantity } = req.body;

        if (!material_id || !project_post_id || !quantity) {
            return res.redirect('/contractor/materials');
        }

        const material = await Material.findById(material_id);
        if (!material) {
            return res.redirect('/contractor/materials');
        }

        await MaterialRequest.create(
            project_post_id,
            material_id,
            material.supplier_id,
            req.cookies.userId,
            parseInt(quantity)
        );

        res.redirect('/contractor/material-requests');
    } catch (error) {
        console.error('Request material error:', error);
        res.status(500).send('Server Error');
    }
};

exports.viewMaterialRequests = async (req, res) => {
    try {
        const requests = await MaterialRequest.findByContractorId(req.cookies.userId);
        res.render('contractor/material-requests', {
            userName: req.cookies.userName,
            requests
        });
    } catch (error) {
        console.error('View material requests error:', error);
        res.status(500).send('Server Error');
    }
};
