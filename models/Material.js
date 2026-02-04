const db = require('../config/db');

class Material {
    static async create(name, quantity, price, supplierId) {
        const [result] = await db.execute(
            'INSERT INTO materials (name, quantity, price, supplier_id) VALUES (?, ?, ?, ?)',
            [name, quantity, price, supplierId]
        );
        return result;
    }

    static async findBySupplierId(supplierId) {
        const [rows] = await db.execute(
            'SELECT * FROM materials WHERE supplier_id = ? ORDER BY created_at DESC',
            [supplierId]
        );
        return rows;
    }

    static async findAll() {
        const [rows] = await db.execute(`
            SELECT m.*, u.name as supplier_name
            FROM materials m
            JOIN users u ON m.supplier_id = u.id
            ORDER BY m.created_at DESC
        `);
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM materials WHERE id = ?', [id]);
        return rows[0];
    }

    static async updateQuantity(id, quantity) {
        const [result] = await db.execute(
            'UPDATE materials SET quantity = ? WHERE id = ?',
            [quantity, id]
        );
        return result;
    }

    static async reduceQuantity(id, amount) {
        const [result] = await db.execute(
            'UPDATE materials SET quantity = quantity - ? WHERE id = ? AND quantity >= ?',
            [amount, id, amount]
        );
        return result;
    }
}

module.exports = Material;
