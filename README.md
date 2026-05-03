# Real-Time Chat Room Backend

This is the backend service for a real-time multi-room chat application built using Node.js, Express, Socket.io, and JWT authentication.

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Secure REST APIs
- Real-time communication using WebSockets (Socket.io)
- Multi-room chat support (join/leave rooms)
- Broadcast messaging within rooms
- JWT-based socket authentication
- Scalable backend structure

## 🛠️ Tech Stack

- Node.js
- Express.js
- Socket.io
- JSON Web Token (JWT)
- (Optional) MongoDB for message persistence

---

## 📂 Project Structure
backend/
│── src/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── sockets/
│ ├── models/ (if using DB)
│ └── app.js
│── server.js
│── package.json
│── .env


## ⚙️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd backend
