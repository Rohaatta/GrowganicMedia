import { useState } from "react";
import { Play } from "lucide-react";
import { categoryOptions } from "../lib/data";

const accentClasses = {
  moss: "bg-moss",
  "moss-light": "bg-moss-light",
  clay: "bg-clay",
  stone: "bg-stone",
};

const categoryLabel = (key) =>
  categoryOptions.find((c) => c.key === key)?.label ?? key;

export default function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  const hasRealVideo = Boolean(video.videoUrl);

  return (
    <article className="group">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        {playing && hasRealVideo ? (
          // Real video — actually plays the admin-added link
          <video
            src={video.videoUrl}
            poster={video.thumbnailUrl || undefined}
            className="h-full w-full object-cover"
            controls
            autoPlay
          />
        ) : (
          <button
            type="button"
            onClick={() => hasRealVideo && setPlaying(true)}
            className={`relative h-full w-full ${
              hasRealVideo ? "cursor-pointer" : "cursor-default"
            } ${!video.thumbnailUrl ? accentClasses[video.accent] ?? "bg-stone" : ""}`}
            aria-label={`Play ${video.title}`}
          >
            {video.thumbnailUrl && (
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-90 transition-transform duration-300 group-hover:scale-110">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/90">
                <Play size={18} className="text-ink" fill="currentColor" />
              </div>
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-ink/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-paper">
              {categoryLabel(video.category)}
            </span>
            {video.duration && (
              <span className="absolute bottom-3 right-3 font-mono text-[11px] text-paper/85">
                {video.duration}
              </span>
            )}
          </button>
        )}
      </div>
      <h3 className="mt-3 font-display text-base text-ink">{video.title}</h3>
      {video.client && <p className="text-sm text-ink/55">{video.client}</p>}
    </article>
  );
}