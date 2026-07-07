import { Check } from "lucide-react";

import logo from "../assets/logo.png"; 
const styles = {
  section: {
    position: "relative",
  },
  goodCard: {
    position: "relative",
    overflow: "hidden",
  },
  cornerGlow: {
    position: "absolute",
    top: "-100px",
    right: "-100px",
    width: "200px",
    height: "200px",
    background:
      "radial-gradient(circle,#765eff, transparent 100%)",
    filter: "blur(50px)",
    pointerEvents: "none",
    zIndex: 1,
  },
};

export default function ComparisonSection() {
  return (
    <section id="about" className="py-16" style={styles.section}>
      <div className="relative z-10 mx-auto max-w-4xl px-4 mb-12 items-center justify-center text-center">
         <span className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold tracking-[0.25em] text-white/100">
              Comparison
            </span>

        {/* Title */}
         <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
    But, why would you want to {" "}<br />
    <span className="italic font-bold font-serif text-[#765eff]">work with us?</span>
  </h2>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Bad */}
          <div>
            <h3 className="mb-4 text-2xl font-regular text-white/50">
               Other Agencies
            </h3>

            <div className="rounded-2xl border border-white/10 bg-black/5 p-6">
              <ul className="relative z-10 mt-4 space-y-3 text-medium text-left text-white/50">
                <li>✖ Junior-level execution</li>
                <li>✖ Little industry insight </li>
                <li>✖ Generic strategies</li>
                <li>✖ Single-channel approach</li>
                <li>✖ Slow communication</li>
              </ul>
            </div>
          </div>

          {/* Good */}
          <div>
            <h3 className="mb-4 flex items-center justify-center gap-2">
  <img src={logo} alt="GrowGanicMedia logo" className="h-6 w-auto" />
  <span className="text-2xl font-semibold text-white">GrowganicMedia</span>
</h3>
            <div
  className="rounded-2xl border border-white/20 bg-black/10 p-6 text-left"
  style={styles.goodCard}
>
  <div style={styles.cornerGlow} />

  <ul className="relative z-10 mt-4 space-y-3 text-medium text-left text-white/80">
    <li className="flex items-center gap-3">
  <Check className="h-5 w-5 text-[#765eff] flex-shrink-0" />
  <span>Experts with 4+ years of experience </span>
</li>

<li className="flex items-center gap-3">
  <Check className="h-5 w-5 text-[#765eff] flex-shrink-0" />
  <span>Industry-focused research</span>
</li>

<li className="flex items-center gap-3">
  <Check className="h-5 w-5 text-[#765eff] flex-shrink-0" />
  <span>Tailored growth plans</span>
</li>

<li className="flex items-center gap-3">
  <Check className="h-5 w-5 text-[#765eff] flex-shrink-0" />
  <span>Omni-channel strategy</span>
</li>

<li className="flex items-center gap-3">
  <Check className="h-5 w-5 text-[#765eff] flex-shrink-0" />
  <span>Fast, clear communication</span>
</li>
  </ul>
</div>
</div>
        </div>
      </div>
    </section>
  );
}