import express from "express";
import { supabase } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Admin only — read inquiries
router.get("/", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Public — contact form submit
router.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }

  const { data, error } = await supabase
    .from("inquiries")
    .insert([{ name, email, message }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("inquiries").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;