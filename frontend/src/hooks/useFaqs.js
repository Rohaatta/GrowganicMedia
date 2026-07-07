import { useEffect, useState } from "react";
import { faqs } from "../lib/data";

// Returns FAQ entries. Swap for lib/queries.js -> faqsQuery once Sanity
// is connected.
export function useFaqs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(faqs);
    setLoading(false);
  }, []);

  return { faqs: data, loading };
}
