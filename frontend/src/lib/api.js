const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getVideos() {
  const res = await fetch(`${API_BASE}/api/videos`);
  if (!res.ok) throw new Error("Failed to load videos");
  return res.json();
}

export async function getTestimonials() {
  const res = await fetch(`${API_BASE}/api/testimonials`);
  if (!res.ok) throw new Error("Failed to load testimonials");
  return res.json();
}

export async function submitInquiry({ name, email, message }) {
  const res = await fetch(`${API_BASE}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to send message");
  }
  return res.json();
}