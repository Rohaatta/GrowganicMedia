import PricingSection from "../components/PricingSection";
import FaqSection from "../components/FaqSection";
import FinalCta from "../components/FinalCta";

export default function Pricing() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-16 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-clay">Pricing</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          Simple plans, no surprise invoices.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink/70">
          Pick a monthly volume that matches your posting schedule. Upgrade or downgrade
          whenever your needs change.
        </p>
      </div>

      <PricingSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
