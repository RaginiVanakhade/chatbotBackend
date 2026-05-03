import pool from '../config/db.js';

export const getRooms = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id, room_name FROM rooms ORDER BY room_name');
        res.json(rows);
        console.log(rows)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};