import React, { useEffect } from "react";

// 👉 Apna real Calendly event link yahan daalein
// (Calendly dashboard > Event Type > Share > "Link" wala URL)
const CALENDLY_URL = "https://calendly.com/growganicmediallc/30min";

export default function BookACallSection() {
  // Calendly ka widget script load karta hai (sirf ek dafa)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      style={{
        background: "#000000",
        color: "#f5f5f7",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 760, width: "100%", textAlign: "center" }}>
        <h2 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
    Ready to {" "}
    <span className="italic font-bold font-serif text-[#765eff]">scale?</span>
    <span className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl"> Let's talk</span>
  </h2>
  

        <p style={{ color: "#9a9aa5", margin: "0 0 30px", fontSize: 16 }}>
          Book a free strategy call and let's build a content system that drives real growth, not just 
visibility
        </p>

        {/* 👇 Yeh Calendly ka live widget hai, image nahi */}
        <div
          className="calendly-inline-widget"
          data-url={CALENDLY_URL}
          style={{
            minWidth: 320,
            height: 700,
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            background: "#dedede",
          }}
        />
      </div>
    </section>
  );
}