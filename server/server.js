import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
import cors from "cors";

import connectDB from "./src/config/db.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to library management system",
    });
});

const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })


};

startServer();