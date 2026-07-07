import express from "express";
import { supabase } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/", requireAuth, async (req, res) => {
  const { clientName, clientCompany, clientAvatar, quote, videoUrl, thumbnailUrl } = req.body || {};

  if (!clientName || !quote || !videoUrl) {
    return res.status(400).json({ error: "clientName, quote, and videoUrl are required" });
  }

  const { data, error } = await supabase
    .from("testimonials")
    .insert([{ clientName, clientCompany: clientCompany || "", clientAvatar: clientAvatar || "", quote, videoUrl, thumbnailUrl: thumbnailUrl || "" }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { clientName, clientCompany, clientAvatar, quote, videoUrl, thumbnailUrl } = req.body || {};

  const { data, error } = await supabase
    .from("testimonials")
    .update({ clientName, clientCompany, clientAvatar, quote, videoUrl, thumbnailUrl })
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: "Testimonial not found" });
  res.json(data[0]);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;