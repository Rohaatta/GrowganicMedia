import express from "express";
import { supabase } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public — frontend reads this
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Admin only
router.post("/", requireAuth, async (req, res) => {
  const { title, category, videoUrl, thumbnailUrl, duration, views } = req.body || {};

  if (!title || !videoUrl) {
    return res.status(400).json({ error: "title and videoUrl are required" });
  }

  const { data, error } = await supabase
    .from("videos")
    .insert([{ title, category: category || "youtube", videoUrl, thumbnailUrl: thumbnailUrl || "", duration: duration || "", views: views || "" }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, category, videoUrl, thumbnailUrl, duration, views } = req.body || {};

  const { data, error } = await supabase
    .from("videos")
    .update({ title, category, videoUrl, thumbnailUrl, duration, views })
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: "Video not found" });
  res.json(data[0]);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("videos").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;