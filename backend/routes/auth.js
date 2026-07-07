import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );
    return res.json({ token, username });
  }

  return res.status(401).json({ error: "Invalid username or password" });
});

export default router;