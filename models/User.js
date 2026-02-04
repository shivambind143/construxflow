const db = require('../config/db');

class User {
    static async create(name, email, hashedPassword, role) {
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );
        return result;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async getTotalCount() {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM users');
        return rows[0].count;
    }

    static async getCountByRole(role) {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = ?', [role]);
        return rows[0].count;
    }
}

module.exports = User;
