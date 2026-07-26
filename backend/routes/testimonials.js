import express from "express";
import sql from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM testimonials ORDER BY "createdAt" DESC`;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const { clientName, clientCompany, clientAvatar, quote, videoUrl, thumbnailUrl } = req.body || {};
  if (!clientName || !quote || !videoUrl) return res.status(400).json({ error: "clientName, quote, and videoUrl are required" });

  try {
    const [row] = await sql`
      INSERT INTO testimonials ("clientName", "clientCompany", "clientAvatar", quote, "videoUrl", "thumbnailUrl")
      VALUES (${clientName}, ${clientCompany || ""}, ${clientAvatar || ""}, ${quote}, ${videoUrl}, ${thumbnailUrl || ""})
      RETURNING *
    `;
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { clientName, clientCompany, clientAvatar, quote, videoUrl, thumbnailUrl } = req.body || {};

  try {
    const [row] = await sql`
      UPDATE testimonials SET "clientName"=${clientName}, "clientCompany"=${clientCompany || ""},
      "clientAvatar"=${clientAvatar || ""}, quote=${quote}, "videoUrl"=${videoUrl}, "thumbnailUrl"=${thumbnailUrl || ""}
      WHERE id=${id} RETURNING *
    `;
    if (!row) return res.status(404).json({ error: "Testimonial not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await sql`DELETE FROM testimonials WHERE id=${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;