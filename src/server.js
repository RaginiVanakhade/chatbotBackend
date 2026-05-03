import app from "./app.js";
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import pool from './config/db.js';

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: { origin: "http://localhost:5173", credentials: true }
});

// JWT middleware for Socket.io handshake
io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) return next(new Error('Authentication error'));
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error('Invalid token'));
        socket.user = decoded; // { id, username }
        next();
    });
});

io.on('connection', (socket) => {
    console.log(`User ${socket.user.username} connected`);

    socket.on('join_room', async (roomId) => {
        socket.join(roomId);
        socket.roomId = roomId;

        // Load last 50 messages from MySQL (message history)
        const [rows] = await pool.execute(
            `SELECT m.content, m.created_at, u.username 
             FROM messages m
             JOIN users u ON m.user_id = u.id
             WHERE m.room_id = ?
             ORDER BY m.created_at DESC
             LIMIT 50`,
            [roomId]
        );
        const history = rows.reverse();
        socket.emit('message_history', history);
    });

    socket.on('send_message', async (data) => {
        const { roomId, message } = data;
        const userId = socket.user.id;
        const username = socket.user.username;

        // Save to MySQL
        const [result] = await pool.execute(
            'INSERT INTO messages (room_id, user_id, content) VALUES (?, ?, ?)',
            [roomId, userId, message]
        );
        const messageObj = {
            id: result.insertId,
            content: message,
            username,
            created_at: new Date()
        };
        // Broadcast to room
        io.to(roomId).emit('receive_message', messageObj);
    });

    socket.on('typing', (data) => {
        socket.to(data.roomId).emit('user_typing', { username: socket.user.username });
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.user.username} disconnected`);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});