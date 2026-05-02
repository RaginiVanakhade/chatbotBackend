import pool from '../config/db.js';

export const createUser = async (username, email, passwordHash) => {
    const [result] = await pool.execute(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, passwordHash]
    );
    return result.insertId;
};

export const findUserByEmail = async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

export const findUserByUsername = async (username) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};