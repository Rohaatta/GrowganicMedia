import { useState } from "react";
import { Link } from "react-router-dom";
import { categoryOptions } from "../lib/data";
import { useVideos } from "../hooks/useVideos";
import VideoCard from "./VideoCard";

export default function VideoPortfolio({
  limit,
  showFilters = true,
  showViewAll = false,
  title = "Recent work",
  subtitle = "A sample of what's gone out the door this quarter.",
}) {
  const [category, setCategory] = useState("all");
  const { videos } = useVideos(category);
  const visible = limit ? videos.slice(0, limit) : videos;

  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-clay">Portfolio</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{title}</h2>
          <p className="mt-4 text-ink/70">{subtitle}</p>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  category === cat.key
                    ? "bg-moss text-paper"
                    : "border border-ink/15 text-ink/60 hover:border-ink/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-10 text-center">
          <Link to="/portfolio" className="text-sm font-medium text-moss hover:underline">
            View full portfolio →
          </Link>
        </div>
      )}
    </section>
  );
}