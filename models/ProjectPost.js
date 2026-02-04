const db = require('../config/db');

class ProjectPost {
    static async create(description, location, workersRequired, workerType, salary, contractorId) {
        const [result] = await db.execute(
            'INSERT INTO project_posts (description, location, workers_required, worker_type, salary, contractor_id) VALUES (?, ?, ?, ?, ?, ?)',
            [description, location, workersRequired, workerType, salary, contractorId]
        );
        return result;
    }

    static async findByContractorId(contractorId) {
        const [rows] = await db.execute(
            'SELECT * FROM project_posts WHERE contractor_id = ? ORDER BY created_at DESC',
            [contractorId]
        );
        return rows;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM project_posts ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM project_posts WHERE id = ?', [id]);
        return rows[0];
    }

    static async getTotalCount() {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM project_posts');
        return rows[0].count;
    }
}

module.exports = ProjectPost;
