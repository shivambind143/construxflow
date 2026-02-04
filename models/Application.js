const db = require('../config/db');

class Application {
    static async create(workerId, projectPostId) {
        try {
            const [result] = await db.execute(
                'INSERT INTO applications (worker_id, project_post_id) VALUES (?, ?)',
                [workerId, projectPostId]
            );
            return result;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('You have already applied to this job');
            }
            throw error;
        }
    }

    static async findByWorkerId(workerId) {
        const [rows] = await db.execute(`
            SELECT a.*, p.description, p.location, p.salary, p.worker_type, u.name as contractor_name
            FROM applications a
            JOIN project_posts p ON a.project_post_id = p.id
            JOIN users u ON p.contractor_id = u.id
            WHERE a.worker_id = ?
            ORDER BY a.created_at DESC
        `, [workerId]);
        return rows;
    }

    static async findByProjectPostId(projectPostId) {
        const [rows] = await db.execute(`
            SELECT a.*, u.name as worker_name, u.email as worker_email
            FROM applications a
            JOIN users u ON a.worker_id = u.id
            WHERE a.project_post_id = ?
            ORDER BY a.created_at DESC
        `, [projectPostId]);
        return rows;
    }

    static async findByContractorId(contractorId) {
        const [rows] = await db.execute(`
            SELECT a.*, u.name as worker_name, u.email as worker_email, 
                   p.description as project_description
            FROM applications a
            JOIN users u ON a.worker_id = u.id
            JOIN project_posts p ON a.project_post_id = p.id
            WHERE p.contractor_id = ?
            ORDER BY a.created_at DESC
        `, [contractorId]);
        return rows;
    }

    static async updateStatus(id, status) {
        const [result] = await db.execute(
            'UPDATE applications SET status = ? WHERE id = ?',
            [status, id]
        );
        return result;
    }

    static async getTotalCount() {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM applications');
        return rows[0].count;
    }
}

module.exports = Application;
