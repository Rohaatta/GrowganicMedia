import express from "express";
import sql from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM inquiries ORDER BY "createdAt" DESC`;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "name, email, and message are required" });

  try {
    const [row] = await sql`
      INSERT INTO inquiries (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING *
    `;
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await sql`DELETE FROM inquiries WHERE id=${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;