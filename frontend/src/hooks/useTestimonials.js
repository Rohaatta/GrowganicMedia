import { useEffect, useState } from "react";
import { testimonials as staticTestimonials } from "../lib/data";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Maps the backend's raw shape (clientName/clientCompany/clientAvatar —
// set by the admin panel's testimonial form) onto the shape this
// component already expects (name/role/avatarUrl), so the component
// doesn't need to know which source the data came from.
function normalize(row) {
  return {
    id: row.id,
    name: row.clientName,
    role: row.clientCompany || "Client",
    quote: row.quote,
    initials: row.clientName?.slice(0, 2).toUpperCase() ?? "??",
    avatarUrl: row.clientAvatar || "",
    thumbnailUrl: row.thumbnailUrl || "",
    videoUrl: row.videoUrl || "",
  };
}

// Tries the real backend first (testimonials added through the admin
// panel). Falls back to the static placeholder list if the server isn't
// running yet, or the request fails for any reason.
export function useTestimonials() {
  const [data, setData] = useState(staticTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load testimonials");
        return res.json();
      })
      .then((rows) => {
        if (cancelled) return;
        if (rows && rows.length > 0) {
          setData(rows.map(normalize));
        }
      })
      .catch(() => {
        // Backend not reachable — keep the static fallback.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { testimonials: data, loading };
}