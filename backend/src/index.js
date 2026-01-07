import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);

//Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));

//DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔥 MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", err);
    proccess.exit(1); // Exit process with failure
  }
};

//Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running...",
  });
});
//404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada",
  });
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
