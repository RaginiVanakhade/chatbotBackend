import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend ");
});

export default app;