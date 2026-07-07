import { ArrowRight } from "lucide-react";
import { siteConfig } from "../lib/config";
import Button from "../ui/Button";

export default function FinalCta() {
  return (
    <section id="call" className="bg-paper py-24 text-paper">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl sm:text-5xl text-white">
          Ready to grow? <span className="italic font-serif font-bold text-sprout">Let's talk.</span>
        </h2>
        <p className="mt-4 text-white/65">
          Book a free 30-minute strategy call — we'll look at your current content and tell
          you exactly where the gaps are.
        </p>
        <br/>
        <a
                href="https://calendly.com/growganicmediallc/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#765eff] px-6 py-3 font-semibold text-white transition hover:bg-gray-400"
              >
                Book a 30 min call              </a>
      </div>
    </section>
  );
}
