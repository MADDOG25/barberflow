import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🔥 MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//Routes
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
