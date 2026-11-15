import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://portfolio-client-ten-eosin.vercel.app"] }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Portfolio API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();