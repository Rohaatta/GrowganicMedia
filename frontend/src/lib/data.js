// Static placeholder data. This is the single source of truth for now —
// every hook in /hooks reads from here. When Sanity is wired up, only the
// fetcher inside each hook needs to change (see lib/queries.js + lib/sanity.js);
// the shape of this data is already written to match what the GROQ queries
// will eventually return, so components won't need to change.

export const heroContent = {
  eyebrow: "Content studio for growing brands",
  headlineLines: [" More Views & Revenue", " Without Spending Hours."],
  subheadline:
     "Helping busy B2B founders,Coaches and Creators generate qualified leads,Sales and Authority through Automated Content System.",
     
  stats: [
    { label: "Videos delivered", value: 420 },
    { label: "Avg. turnaround", value: "48hrs" },
    { label: "Brands grown", value: 30 },
  ],
};

export const services = [
  {
    id: "short-form",
    icon: "clapperboard",
    title: "Short-Form Content",
    description:
      "Reels, TikToks, and Shorts cut for retention and shares — built to perform in the first three seconds.",
  },
  {
    id: "youtube",
    icon: "youtube",
    title: "YouTube Long-Form",
    description:
      "Full episodes paced for watch time, with pattern interrupts and chapters that keep subscribers coming back.",
  },
  {
    id: "podcast",
    icon: "mic",
    title: "Podcast Editing",
    description:
      "Clean audio, tight cuts, and clip-ready timestamps so every episode earns its place in the feed.",
  },
  {
    id: "ads",
    icon: "megaphone",
    title: "Ad Creatives & VSLs",
    description:
      "Performance-first creatives storyboarded around the hook, the offer, and the close.",
  },
  {
    id: "explainers",
    icon: "sparkles",
    title: "Brand & Explainers",
    description:
      "Turning a complex product into a simple story — built for SaaS, apps, and anything hard to explain in a feed.",
  },
  {
    id: "personal-brand",
    icon: "linkedin",
    title: "Personal Branding",
    description:
      "One interview, twelve videos. We turn your voice into a steady drumbeat of authority content.",
  },
];

export const clients = [
  { id: "c1", name: "Cedar & Co" },
  { id: "c2", name: "Northwell Studio" },
  { id: "c3", name: "Marrow Labs" },
  { id: "c4", name: "Heliotrope" },
  { id: "c5", name: "Fieldnote" },
  { id: "c6", name: "Lower Deck" },
  { id: "c7", name: "Saltwire" },
  { id: "c8", name: "Anchorhold" },
];

export const testimonials = [
  {
    id: "t1",
    name: "Sam Reyes",
    role: "Founder, Anchorhold",
    quote:
      "I knew I'd hire a content team eventually — once we started, month one alone outperformed our entire previous quarter. They understood our voice immediately.",
    initials: "SR",
  },
  {
    id: "t2",
    name: "Priya Nandan",
    role: "Speaking Coach",
    quote:
      "I wouldn't have started my YouTube channel without this team. Our first video crossed eighty thousand views and changed how I think about content.",
    initials: "PN",
  },
  {
    id: "t3",
    name: "Marcus Hale",
    role: "Founder, 301 Studios",
    quote:
      "Unmatched work rate and dedication. They've become an invaluable partner for everything we produce — not just an edit shop.",
    initials: "MH",
  },
  {
    id: "t4",
    name: "Ines Calder",
    role: "Founder, Penfriend",
    quote:
      "Seamless from the first brief. Versatile with video and motion, genuinely a one-stop shop — we're excited for a long partnership.",
    initials: "IC",
  },
  {
    id: "t5",
    name: "Theo Bram",
    role: "Co-founder, Ratcliffe Bros.",
    quote:
      "Our content went from rushed and inconsistent to something we're proud to put our name on, almost overnight.",
    initials: "TB",
  },
  {
    id: "t6",
    name: "Jordan Wells",
    role: "Founder, Human Voiceover",
    quote:
      "Never once left us guessing on revisions. The end result matched exactly what we were picturing, every time.",
    initials: "JW",
  },
];



export const faqs = [
  {
    id: "f1",
    question: "How fast will I receive my content?",
    answer:
      "Most requests are returned within 48 hours. Larger long-form edits or campaigns may take a little longer, and we'll always tell you the timeline upfront.",
  },
  {
    id: "f2",
    question: "How do I request edits?",
    answer:
      "You drop raw footage and a brief into your shared workspace. Requests queue automatically and your editor picks them up in order — no email back-and-forth required.",
  },
  {
    id: "f3",
    question: "Why not just hire an in-house editor?",
    answer:
      "One editor gets sick, takes vacation, and has a ceiling on skills. You get a full team — editor, motion designer, and strategist — for less than one full-time hire, with no hiring risk.",
  },
  {
    id: "f4",
    question: "What if I'm not happy with a video?",
    answer:
      "Revisions are unlimited on every active request. We keep refining until it's right before it counts against your monthly volume.",
  },
  {
    id: "f5",
    question: "Do you offer a trial or sample edit?",
    answer:
      "Yes — book a call and we'll edit one piece of your existing footage so you can see our style on your own content before committing.",
  },
  {
    id: "f6",
    question: "Is there a refund if it's not a fit?",
    answer:
      "If your first month doesn't meet the bar we set on the call, we'll refund it in full. After that, plans are monthly with no long-term lock-in.",
  },
];

// Matches the category values the admin panel's video form actually saves
// ("shorts" | "youtube" | "vsl"), with display labels for the UI.
export const categoryOptions = [
  { key: "all", label: "All" },
  { key: "shorts", label: "Shorts & Reels" },
  { key: "youtube", label: "YouTube" },
  { key: "vsl", label: "VSLs & Ads" },
];

export const videos = [
  { id: "v1", title: "Launch week recap", client: "Cedar & Co", category: "shorts", duration: "0:34", accent: "moss" },
  { id: "v2", title: "Founder Q&A clip", client: "Heliotrope", category: "shorts", duration: "0:48", accent: "clay" },
  { id: "v3", title: "Product walkthrough", client: "Marrow Labs", category: "youtube", duration: "8:12", accent: "moss-light" },
  { id: "v4", title: "Behind the brand", client: "Northwell Studio", category: "youtube", duration: "11:40", accent: "stone" },
  { id: "v5", title: "Episode 42 — full cut", client: "Fieldnote", category: "youtube", duration: "52:03", accent: "clay" },
  { id: "v6", title: "Episode 43 — clip pack", client: "Fieldnote", category: "shorts", duration: "1:02", accent: "moss" },
  { id: "v7", title: "Spring offer VSL", client: "Lower Deck", category: "vsl", duration: "1:30", accent: "moss-light" },
  { id: "v8", title: "Retargeting hook set", client: "Saltwire", category: "vsl", duration: "0:22", accent: "stone" },
  { id: "v9", title: "Onboarding explainer", client: "Anchorhold", category: "youtube", duration: "3:45", accent: "moss" },
  { id: "v10", title: "Day-in-the-life", client: "Cedar & Co", category: "shorts", duration: "0:41", accent: "clay" },
  { id: "v11", title: "Conversion-focused ad", client: "Marrow Labs", category: "vsl", duration: "0:58", accent: "moss-light" },
  { id: "v12", title: "Listener Q&A clip", client: "Fieldnote", category: "shorts", duration: "1:15", accent: "stone" },
];