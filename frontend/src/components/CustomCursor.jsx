import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Mouse movement listener
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic delay trail animation
    let animationFrameId;
    const updateTrail = () => {
      setTrail((prev) => {
        // Linear interpolation to make the trail follow smoothly
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    // Hover detection on links, buttons, and clickable cards
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.glass-card') ||
        target.style.cursor === 'pointer'
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [position.x, position.y]);

  if (hidden) return null;

  return (
    <>
      {/* Tiny inner dot */}
      <div 
        style={{
          ...styles.cursorDot,
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: hovered ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
          backgroundColor: hovered ? '#765EFF' : '#765EFF',
        }}
      />
      {/* Outer glowing trail ring */}
      <div 
        style={{
          ...styles.cursorRing,
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: hovered ? 'translate(-50%, -50%) scale(1.8)' : 'translate(-50%, -50%) scale(1)',
          borderColor: hovered ? 'rgba(128, 128, 255, 0.8)' : 'rgba(128, 128, 255, 0.4)',
          backgroundColor: hovered ? 'rgba(128, 128, 255, 0.08)' : 'transparent',
          boxShadow: hovered ? '0 0 15px rgba(128, 128, 255, 0.4)' : 'none',
        }}
      />
    </>
  );
}

const styles = {
  cursorDot: {
    position: 'fixed',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transition: 'transform 0.1s ease, background-color 0.2s ease',
  },
  cursorRing: {
    position: 'fixed',
    width: '32px',
    height: '32px',
    border: '1.5px solid rgba(59, 130, 246, 0.4)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9998,
    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background-color 0.2s, box-shadow 0.2s',
  }
};
