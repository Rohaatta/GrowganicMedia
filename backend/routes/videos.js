import express from "express";
import sql from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const videos = await sql`SELECT * FROM videos ORDER BY "createdAt" DESC`;
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const { title, category, videoUrl, thumbnailUrl, duration, views } = req.body || {};
  if (!title || !videoUrl) return res.status(400).json({ error: "title and videoUrl are required" });

  try {
    const [video] = await sql`
      INSERT INTO videos (title, category, "videoUrl", "thumbnailUrl", duration, views)
      VALUES (${title}, ${category || "youtube"}, ${videoUrl}, ${thumbnailUrl || ""}, ${duration || ""}, ${views || ""})
      RETURNING *
    `;
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, category, videoUrl, thumbnailUrl, duration, views } = req.body || {};

  try {
    const [video] = await sql`
      UPDATE videos SET title=${title}, category=${category}, "videoUrl"=${videoUrl},
      "thumbnailUrl"=${thumbnailUrl || ""}, duration=${duration || ""}, views=${views || ""}
      WHERE id=${id} RETURNING *
    `;
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await sql`DELETE FROM videos WHERE id=${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;