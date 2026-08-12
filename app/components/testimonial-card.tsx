"use client";

import { useState, useRef } from "react";

export default function TestimonialCard({
  quote,
  name,
  role,
  photo,
  gif,
}: {
  quote: string;
  name: string;
  role: string;
  photo: string;
  gif?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(true);
  };

  const handleLeave = () => {
    // Small delay so the GIF doesn't flicker on accidental mouse-outs
    timeoutRef.current = setTimeout(() => setHovered(false), 100);
  };

  return (
    <blockquote
      className="relative flex flex-col justify-between rounded-lg p-5 overflow-visible bg-[var(--surface)]"
      style={{ boxShadow: "var(--shadow-flush)" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <p className="text-[14px] leading-[1.55] tracking-[-0.005em] text-[rgba(0,0,0,.65)] mb-5">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="flex items-center gap-3">
        <img
          src={photo}
          alt={name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <cite className="not-italic block text-[13px] font-[550] text-[rgba(0,0,0,.85)] leading-tight">
            {name}
          </cite>
          <span className="text-[12px] text-[rgba(0,0,0,.4)]">{role}</span>
        </div>
      </footer>

      {/* Reaction GIF — peeks out from bottom-right corner */}
      {gif && (
        <div
          className="absolute pointer-events-none hidden [@media(hover:hover)]:block"
          style={{
            right: -12,
            bottom: -16,
            width: 100,
            height: 100,
            zIndex: 10,
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "scale(1) rotate(3deg)"
              : "scale(0.3) rotate(-8deg)",
            transformOrigin: "bottom right",
            transition: hovered
              ? "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease"
              : "transform 250ms var(--ease-out-quart), opacity 150ms ease",
          }}
        >
          <img
            src={gif}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            style={{
              boxShadow: "0 4px 16px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.08)",
            }}
          />
        </div>
      )}
    </blockquote>
  );
}
