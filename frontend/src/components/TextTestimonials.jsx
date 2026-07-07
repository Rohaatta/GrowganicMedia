import React from "react";

const testimonials = [
  {
    id: 1,
    quote: "Working with GrowGanicMedia transformed our content strategy. Hassan took the time to understand our goals and delivered professional, engaging content that truly reflected our brand. The process was smooth, timely, and made a real impact on our business.",
    
  },
  {
    id: 2,
    quote: "Working with GrowGanicMedia was seamless from start to finish. Hassan understood our business, delivered high-quality content on time, and made the entire process simple and stress-free. It truly felt like working with someone who genuinely cared about our success.",
  
  },
  {
    id: 3,
    quote: "Our engagement increased significantly after using their designs. Highly recommended!",
    
  },
  {
    id: 4,

    quote: "Creative, reliable, and always on time. One of the best agencies we've worked with.",
    
  },
  {
    id: 5,
    quote: "Working with GrowGanicMedia transformed our content strategy. Hassan took the time to understand our goals and delivered professional, engaging content that truly reflected our brand. The process was smooth, timely, and made a real impact on our business.",
    
  },
  {
    id: 6,
    quote: "If you're looking for a content partner who understands both branding and business growth, GrowGanicMedia is an excellent choice. Highly recommended.",
   
  },
  {
    id: 7,
    quote: "Professional, responsive, and incredibly talented. Couldn't ask for a better team.",
    
  },
  {
    id: 8,
    quote: "Working with GrowGanicMedia was one of the best decisions we made for our content strategy. Hassan's strategic approach, professionalism, and attention to our business goals made a real difference. Highly recommended for any business looking to grow through purposeful content.",
    
  },
  {
    id: 9,
    quote: "GrowGanicMedia delivers more than just content—they deliver strategy and results. Hassan was professional, reliable, and a pleasure to work with. Highly recommended!",
    
  },
];

// 9 cards ko 3 columns mein split karo
const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);

const TestimonialCard = ({ item }) => (
  <div id="ttestimonials" className="mb-4 rounded-3xl border border-white/10 bg-[#0d0d0d] p-6">
    <p className="text-sm leading-7 text-white/70">{item.quote}</p>
    <div className="mt-6 flex items-center gap-3">
     
      <div>
        <h4 className="font-medium text-white">{item.name}</h4>
        <p className="text-sm text-white/45">{item.role}</p>
      </div>
    </div>
  </div>
);

// Infinite scroll column — cards duplicate hote hain seamless loop ke liye
const ScrollColumn = ({ cards, direction = "up", duration = "20s" }) => {
  const animClass =
    direction === "up" ? "animate-scroll-up" : "animate-scroll-down";

  return (
    <div className="relative overflow-hidden" style={{ height: "600px" }}>
      {/* Top fade */}
      <div className="pointer-events-none absolute top-0 z-10 h-24 w-full bg-gradient-to-b from-black to-transparent" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 z-10 h-24 w-full bg-gradient-to-t from-black to-transparent" />

      <div
        className={animClass}
        style={{ animationDuration: duration }}
      >
        {/* Cards twice for seamless loop */}
        {[...cards, ...cards].map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <>
      {/* 👇 Yeh style tag global CSS inject karta hai animation ke liye */}
      <style>{`
        @keyframes scrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up {
          animation: scrollUp linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown linear infinite;
        }
        .animate-scroll-up:hover,
        .animate-scroll-down:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Heading */}
          <div className="mb-16 text-center">
             <span className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold tracking-[0.25em] text-white/100">
                Testimonials
            </span>
            <h2 className="mt-8 text-5xl font-semibold leading-tight text-white">
              We don't claim results.
              <br />
              <span className="italic font-bold font-serif text-[#765eff]">Our clients do.</span>
            </h2>
          </div>

          {/* 3 Columns */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ScrollColumn cards={col1} direction="up"   duration="18s" />
            <ScrollColumn cards={col2} direction="down" duration="22s" />
            <ScrollColumn cards={col3} direction="up"   duration="20s" />
          </div>

        </div>
      </section>
    </>
  );
}