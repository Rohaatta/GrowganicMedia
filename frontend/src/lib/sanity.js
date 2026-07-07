// Sanity client — NOT ACTIVE YET.
// We're running on static data from lib/data.js for now. When you're
// ready to connect Sanity, install the client and uncomment below:
//
//   npm install @sanity/client
//
// import { createClient } from "@sanity/client";
//
// export const sanityClient = createClient({
//   projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
//   dataset: import.meta.env.VITE_SANITY_DATASET || "production",
//   apiVersion: "2024-01-01",
//   useCdn: true,
// });

export const sanityClient = null;

export const isSanityConfigured = () => Boolean(sanityClient);
