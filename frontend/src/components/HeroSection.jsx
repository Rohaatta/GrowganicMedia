import { useHero } from "../hooks/useHero";
import { siteConfig } from "../lib/config";
import Button from "../ui/Button";
import HeroGlow from "./HeroGlow";

export default function HeroSection() {
  const { hero } = useHero();

  return (
    <section
      id="hero"
      className="relative mx-auto max-w-4xl overflow-hidden px-6 pt-16 pb-40 text-center md:pt-24 min-h-[610px]"
    >
      {!hero ? (
        // Loading ke waqt khaali jagah reserve rakhne ke liye
        <div className="h-full w-full" />
      ) : (
        <>
         <h1 className="content-rise fade-up-1 mx-auto mt-8 max-w-3xl font-bold leading-[1.15] text-moss text-4xl sm:text-5xl md:text-6xl">
  {hero.headlineLines[0]},
  <br />
  <span className="text-sprout font-serif font-bold text-5xl sm:text-6xl md:text-7xl">
    {hero.headlineLines[1]}
  </span>
</h1>
          <p className="content-rise fade-up-2 mx-auto mt-6 max-w-xl text-white/80 text-white sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="content-rise fade-up-3 relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4">
            <div className="group relative isolate">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-20 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sprout opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
              <Button
                href={siteConfig.bookingUrl}
                size="lg"
                className="relative z-10 rounded-full px-7 py-3 font-medium text-white"
                style={{ backgroundColor: "#765EFF" }}
              >
                Book a call
              </Button>
            </div>
            <div className="group relative isolate">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-20 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
              <Button
                href="/#services"
                size="lg"
                className="relative z-10 rounded-full border px-7 py-3 font-medium text-white transition-colors"
                style={{ backgroundColor: "#2a2a30", borderColor: "rgba(255,255,255,0.15)" }}
              >
                Learn More
              </Button>
            </div>
          </div>

          <div style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "300px",
            height: "100px",   // 👈 kam kiya
            pointerEvents: "none",
            zIndex: 0,
          }}>
            <div className="h-full w-full origin-center scale-75 sm:scale-100">
              <HeroGlow />
            </div>
          </div>

          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30px",
            background: "linear-gradient(to top, #000000 40%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }} />

        </>
      )}
    </section>
  );
}