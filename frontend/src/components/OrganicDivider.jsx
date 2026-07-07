import { cn } from "../lib/utils";

/**
 * The site's signature element: a single growing line with branch-points,
 * standing in for the brand's whole idea — content that grows, checkpoint
 * by checkpoint, rather than appearing all at once. Reused (sparingly)
 * between major sections instead of a plain rule.
 */
const tones = {
  light: "text-stone/40",
  dark: "text-paper/30",
};

export default function OrganicDivider({ className, tone = "light" }) {
  return (
    <div className={cn("w-full overflow-hidden", tones[tone], className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 56"
        preserveAspectRatio="none"
        className="h-10 w-full"
      >
        <path
          d="M0 28 C 150 4, 300 4, 450 28 S 750 52, 900 28 S 1100 4, 1200 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="225" cy="16" r="4" className="fill-clay" />
        <circle cx="600" cy="36" r="4" className="fill-sprout" />
        <circle cx="975" cy="16" r="4" className="fill-moss" />
      </svg>
    </div>
  );
}
