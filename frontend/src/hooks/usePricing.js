import { useEffect, useState } from "react";
import { pricingPlans } from "../lib/data";

// Returns pricing plans. Swap for lib/queries.js -> pricingQuery once
// Sanity is connected.
export function usePricing() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(pricingPlans);
    setLoading(false);
  }, []);

  return { plans: data, loading };
}
