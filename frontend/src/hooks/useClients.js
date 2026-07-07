import { useEffect, useState } from "react";
import { clients } from "../lib/data";

// Returns the client/logo list for the trust marquee. Swap for
// lib/queries.js -> clientsQuery once Sanity is connected.
export function useClients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(clients);
    setLoading(false);
  }, []);

  return { clients: data, loading };
}
