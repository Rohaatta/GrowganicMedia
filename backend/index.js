import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import videoRoutes from "./routes/videos.js";
import testimonialRoutes from "./routes/testimonials.js";
import inquiryRoutes from "./routes/inquiries.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Growganic backend running on http://localhost:${PORT}`);
});