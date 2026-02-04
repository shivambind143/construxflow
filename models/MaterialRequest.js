const db = require('../config/db');

class MaterialRequest {
    static async create(projectPostId, materialId, supplierId, contractorId, quantity) {
        const [result] = await db.execute(
            'INSERT INTO material_requests (project_post_id, material_id, supplier_id, contractor_id, quantity) VALUES (?, ?, ?, ?, ?)',
            [projectPostId, materialId, supplierId, contractorId, quantity]
        );
        return result;
    }

    static async findBySupplierId(supplierId) {
        const [rows] = await db.execute(`
            SELECT mr.*, m.name as material_name, m.price, 
                   u.name as contractor_name, p.description as project_description
            FROM material_requests mr
            JOIN materials m ON mr.material_id = m.id
            JOIN users u ON mr.contractor_id = u.id
            JOIN project_posts p ON mr.project_post_id = p.id
            WHERE mr.supplier_id = ?
            ORDER BY mr.created_at DESC
        `, [supplierId]);
        return rows;
    }

    static async findByContractorId(contractorId) {
        const [rows] = await db.execute(`
            SELECT mr.*, m.name as material_name, m.price, 
                   u.name as supplier_name, p.description as project_description
            FROM material_requests mr
            JOIN materials m ON mr.material_id = m.id
            JOIN users u ON mr.supplier_id = u.id
            JOIN project_posts p ON mr.project_post_id = p.id
            WHERE mr.contractor_id = ?
            ORDER BY mr.created_at DESC
        `, [contractorId]);
        return rows;
    }

    static async updateStatus(id, status) {
        const [result] = await db.execute(
            'UPDATE material_requests SET status = ? WHERE id = ?',
            [status, id]
        );
        return result;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM material_requests WHERE id = ?', [id]);
        return rows[0];
    }

    static async getTotalCount() {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM material_requests');
        return rows[0].count;
    }
}

module.exports = MaterialRequest;
