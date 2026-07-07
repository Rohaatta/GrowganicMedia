import { motion } from "framer-motion";

/**
 * GlowEffect
 * Recreates the rotating conic-gradient glow seen in the devtools screenshot:
 * - Outer container: 308.36px x 308.36px (matches inspected element)
 * - Centered via translate(-50%, -50%)
 * - Continuous rotation (the screenshot caught it mid-spin at 76.02deg)
 * - Heavy blur to turn the hard gradient edges into a soft glow
 *
 * Usage:
 *   <div style={{ position: "relative", width: 400, height: 400 }}>
 *     <GlowEffect />
 *   </div>
 * The parent needs `position: relative` (or similar) since the glow
 * positions itself with top/left: 50% + translate.
 */
export default function GlowEffect({
  size = 360.36,
  colors = ["#765EFF", "#1093ff", "#93c5ff", "#9e8dff"],
  duration = 8,
}) {
  return (
    <>
      {/* Static purple radial — peeche */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size * 1.6,
          height: size * 1.6,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(118,94,255,0.55) 0%, rgba(118,94,255,0.15) 50%, transparent 75%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Rotating conic — aage */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          background: `conic-gradient(from 0deg, ${colors.join(", ")})`,
          filter: `blur(26px)`,
          willChange: "transform",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
    </>
  );
}

/**
 * Demo wrapper — drop this in to preview in isolation.
 * Dark backdrop so the glow is visible, same as the screenshot.
 */
export function GlowEffectDemo() {
  return (
    <div className="hero-fade"
      style={{
        position: "relative",
        width: 500,
        height: 500,
        background: "#0B0F19",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GlowEffect />
      
    </div>
  );
}