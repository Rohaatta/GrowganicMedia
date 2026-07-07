import { useTestimonials } from "../hooks/useTestimonials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

// Red YouTube-style play button — matches Unchained's exact look
function RedPlayButton() {
  return (
    <div
      style={{
        width: "78px",
        height: "55px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesomeIcon
        icon={faYoutube}
        style={{ color: "rgb(255, 0, 0)", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default function TestimonialsSection() {
  const { testimonials } = useTestimonials();

  return (
    <section id="testimonials" className="py-24 text-paper" style={{ backgroundColor: "#000000" }}>
      <div className="mx-auto max-w-4xl px-6">

        {/* Heading — exact Unchained style */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <span className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold tracking-[0.25em] text-white/100">
            Our Clients
          </span>

          <h2 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
            Hear it directly from{" "}
            <span className="italic font-bold font-serif text-[#765eff]">our clients.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-medium text-white/70">
            Hear how founders, creators, and business owners are leveraging strategic content to build authority, 
attract qualified opportunities, and grow their brands.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {testimonials.map((t, i) => {
            const isEven = i % 2 === 0;

            return (
              <div
                key={t.id}
                className="overflow-hidden rounded-2xl border border-white/30 bg-[#090909]"
              >
                <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>

                  {/* ── Video thumbnail side ── */}
                  <div className="relative w-full shrink-0 md:w-[55%]">
                    
                    <a  href={t.videoUrl || undefined}
                      target={t.videoUrl ? "_blank" : undefined}
                      rel={t.videoUrl ? "noopener noreferrer" : undefined}
                      className={`group relative block aspect-video w-full overflow-hidden ${
                        t.videoUrl ? "cursor-pointer" : ""
                      }`}
                    >
                      {t.thumbnailUrl ? (
                        <img
                          src={t.thumbnailUrl}
                          alt={`${t.name} video`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a]">
                          <span className="font-mono text-xs uppercase tracking-widest text-white/30">
                            Video coming soon
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/20" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <RedPlayButton />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
                        <p className="line-clamp-1 text-xs italic text-paper/70">
                          {t.quote.split(" ").slice(0, 5).join(" ")}…
                        </p>
                      </div>
                    </a>
                  </div>

                  {/* ── Quote side ── */}
                  <div className="flex flex-col justify-center px-7 py-8 md:px-8">
                    <blockquote className="font-display text-lg font-regular leading-snug text-white sm:text-xl">
                      "{t.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="mt-6 flex items-center gap-3">
                      {t.avatarUrl ? (
                        <img
                          src={t.avatarUrl}
                          alt={t.name}
                          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/10"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#765eff] text-sm font-semibold text-white ring-2 ring-white/10">
                          {t.initials}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-white/45">{t.role}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}