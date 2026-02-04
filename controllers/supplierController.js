const Material = require('../models/Material');
const MaterialRequest = require('../models/MaterialRequest');

exports.dashboard = async (req, res) => {
    try {
        const materials = await Material.findBySupplierId(req.cookies.userId);
        res.render('supplier/dashboard', {
            userName: req.cookies.userName,
            materials
        });
    } catch (error) {
        console.error('Supplier dashboard error:', error);
        res.status(500).send('Server Error');
    }
};

exports.showAddMaterial = (req, res) => {
    res.render('supplier/add-material', {
        userName: req.cookies.userName,
        error: null,
        success: null
    });
};

exports.addMaterial = async (req, res) => {
    try {
        const { name, quantity, price } = req.body;

        if (!name || !quantity || !price) {
            return res.render('supplier/add-material', {
                userName: req.cookies.userName,
                error: 'All fields are required',
                success: null
            });
        }

        await Material.create(name, parseInt(quantity), parseFloat(price), req.cookies.userId);

        res.render('supplier/add-material', {
            userName: req.cookies.userName,
            error: null,
            success: 'Material added successfully!'
        });
    } catch (error) {
        console.error('Add material error:', error);
        res.render('supplier/add-material', {
            userName: req.cookies.userName,
            error: 'Failed to add material',
            success: null
        });
    }
};

exports.viewRequests = async (req, res) => {
    try {
        const requests = await MaterialRequest.findBySupplierId(req.cookies.userId);
        res.render('supplier/requests', {
            userName: req.cookies.userName,
            requests
        });
    } catch (error) {
        console.error('View requests error:', error);
        res.status(500).send('Server Error');
    }
};

exports.updateRequestStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).send('Invalid status');
        }

        // Get the request details
        const request = await MaterialRequest.findById(id);
        
        if (!request) {
            return res.status(404).send('Request not found');
        }

        // Verify this request belongs to this supplier
        if (request.supplier_id != req.cookies.userId) {
            return res.status(403).send('Unauthorized');
        }

        // If approving, check and update material quantity
        if (status === 'approved') {
            const material = await Material.findById(request.material_id);
            
            if (!material) {
                return res.status(404).send('Material not found');
            }

            // Check if enough quantity available
            if (material.quantity < request.quantity) {
                return res.status(400).send('Insufficient material quantity');
            }

            // Reduce material quantity
            await Material.reduceQuantity(request.material_id, request.quantity);
        }

        // Update request status
        await MaterialRequest.updateStatus(id, status);

        res.redirect('/supplier/requests');
    } catch (error) {
        console.error('Update request error:', error);
        res.status(500).send('Server Error');
    }
};
