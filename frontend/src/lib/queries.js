// GROQ queries — NOT ACTIVE YET, kept here so the shape is ready when
// lib/sanity.js is connected. Each query name lines up with a hook in
// /hooks, e.g. heroQuery -> useHero.js.

export const heroQuery = `*[_type == "hero"][0]{ eyebrow, headlineLines, subheadline, stats }`;

export const clientsQuery = `*[_type == "client"] | order(order asc){ _id, name, logo }`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){ _id, name, role, quote, initials, avatar }`;

export const pricingQuery = `*[_type == "pricingPlan"] | order(order asc){ _id, name, price, cadence, description, features, highlighted }`;

export const faqsQuery = `*[_type == "faq"] | order(order asc){ _id, question, answer }`;

export const videosQuery = `*[_type == "video"] | order(publishedAt desc){ _id, title, client, category, duration, accent, thumbnail }`;
