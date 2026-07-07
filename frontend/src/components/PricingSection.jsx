import { Check } from "lucide-react";
import { usePricing } from "../hooks/usePricing";
import { siteConfig } from "../lib/config";
import Button from "../ui/Button";

export default function PricingSection() {
  const { plans } = usePricing();

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-clay">Pricing</p>
        <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
          Plans that scale with your output.
        </h2>
        <p className="mt-4 text-ink/70">
          No per-video invoices. Pick a monthly volume and we keep up with it.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-2xl border p-8 ${
              plan.highlighted ? "border-moss bg-moss text-paper" : "border-ink/10"
            }`}
          >
            {plan.highlighted && (
              <span className="mb-4 inline-block self-start rounded-full bg-sprout px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink">
                Most popular
              </span>
            )}

            <h3 className="font-display text-xl">{plan.name}</h3>
            <p className={`mt-2 text-sm ${plan.highlighted ? "text-paper/70" : "text-ink/60"}`}>
              {plan.description}
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-3xl">${plan.price.toLocaleString()}</span>
              <span className={plan.highlighted ? "text-paper/60" : "text-ink/50"}>
                {plan.cadence}
              </span>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check
                    size={16}
                    className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-sprout" : "text-moss"}`}
                  />
                  <span className={plan.highlighted ? "text-paper/85" : "text-ink/75"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              href={siteConfig.bookingUrl}
              variant={plan.highlighted ? "accent" : "outline"}
              className="mt-8 justify-center"
            >
              Book a call
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
