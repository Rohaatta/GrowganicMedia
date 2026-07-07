import { useEffect, useState } from "react";
import { videos as staticVideos } from "../lib/data";
import { getVideos } from "../lib/api";

function normalize(row) {
  return {
    id: row.id,
    title: row.title,
    client: row.client ?? "",
    category: row.category,
    duration: row.duration ?? "",
    views: row.views ?? "",
    videoUrl: row.videoUrl,
    thumbnailUrl: row.thumbnailUrl,
    accent: row.accent ?? "moss",
  };
}

export function useVideos(category = "all") {
  const [data, setData] = useState(staticVideos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getVideos()
      .then((rows) => {
        if (cancelled) return;
        if (rows && rows.length > 0) {
          setData(rows.map(normalize));
        }
      })
      .catch(() => {
        // Backend not reachable — keep static fallback.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered =
    category === "all" ? data : data.filter((v) => v.category === category);

  return { videos: filtered, loading };
}