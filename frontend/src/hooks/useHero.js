import { useEffect, useState } from "react";
import { heroContent } from "../lib/data";

// Returns the hero section's content. Currently reads from the static
// data file — swap the body of the effect for a Sanity fetch (see
// lib/queries.js -> heroQuery) once that's wired up.
export function useHero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setHero(heroContent);
    setLoading(false);
  }, []);

  return { hero, loading };
}
