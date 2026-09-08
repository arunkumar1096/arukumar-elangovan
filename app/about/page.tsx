"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import NavBar from "../components/nav-bar";

const toolkit = [
  { name: "Figma",      src: "/images/about/toolkit/Figma.png" },
  { name: "Claude",     src: "/images/about/toolkit/Claude.png" },
  { name: "VS Code",    src: "/images/about/toolkit/VS Code.png" },
  { name: "Mixpanel",   src: "/images/about/toolkit/Mixpanel.png" },
  { name: "Gemini",     src: "/images/about/toolkit/Gemini.png" },
  { name: "Loom",       src: "/images/about/toolkit/Loom.png" },
  { name: "Notion",     src: "/images/about/toolkit/Notion.png" },
  { name: "Adobe",      src: "/images/about/toolkit/Adobe.png" },
  { name: "Lottie",     src: "/images/about/toolkit/Lottie.png" },
  { name: "Wispr Flow", src: "/images/about/toolkit/Wispr Flow.png" },
];

const workExperience = [
  {
    role: "Senior Product Designer",
    period: "Nov 2025 – Present",
    org: "Reo.dev",
    description:
      "Leading design for a modern marketing stack built for developer-focused companies. Launched AI workflows across lead generation and account research, and led the design system end-to-end.",
  },
  {
    role: "Senior Product Designer",
    period: "Aug 2022 – Nov 2025",
    org: "MoEngage",
    description:
      "Sole designer for Merlin AI suite — reduced campaign creation time by 30% and lifted engagement by up to 60%. Led the MoEngage design system, improving efficiency by 40%. Spearheaded 0-to-1 design for Personalisation and Recommendation modules.",
  },
  {
    role: "Product Designer",
    period: "Jan 2020 – Aug 2022",
    org: "Hippo Video",
    description:
      "Revamped the product's information architecture, built a distributed design system that cut design and dev time by 30%, and led design for the macOS app which drove a 5% uplift in new user adoption.",
  },
  {
    role: "UX/UI Designer",
    period: "Sep 2018 – Jan 2020",
    org: "CloudNow Technologies",
    description:
      "Designed end-to-end UX for cloud-native solutions across multiple client projects — from research and wireframes to interactive prototypes and usability testing.",
  },
];

const TOOLTIP_DELAY = 300; // ms before first tooltip appears

/* ── Reorderable icon with glass effect ─────────────────── */
function ToolIcon({
  tool,
  style,
  isDragging,
  onPointerDown,
}: {
  tool: { name: string; src: string };
  style?: React.CSSProperties;
  isDragging?: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
}) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        zIndex: isDragging ? 50 : 0,
        ...style,
      }}
      onPointerDown={onPointerDown}
    >
      <div
        className="relative w-full aspect-square rounded-[22.37%] overflow-hidden"
        style={{
          boxShadow: isDragging
            ? "0 8px 24px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.1)"
            : "0 1px 3px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06), inset 0 0 0 0.5px rgba(255,255,255,.15)",
          transform: isDragging ? "scale(1.08)" : "scale(1)",
          transition: isDragging ? "none" : "transform 250ms var(--ease-out-quint), box-shadow 250ms var(--ease-out-quint)",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <img
          src={tool.src}
          alt={tool.name}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,.35) 0%, rgba(255,255,255,.08) 40%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [items, setItems] = useState(toolkit);

  /* ── Tooltip state ──────────────────────────────────────── */
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const [instant, setInstant] = useState(false);
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback((name: string) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
    if (delayTimer.current) clearTimeout(delayTimer.current);
    if (instant) {
      setActiveTip(name);
    } else {
      delayTimer.current = setTimeout(() => {
        setActiveTip(name);
        setInstant(true);
      }, TOOLTIP_DELAY);
    }
  }, [instant]);

  const handleLeave = useCallback(() => {
    if (delayTimer.current) { clearTimeout(delayTimer.current); delayTimer.current = null; }
    setActiveTip(null);
    leaveTimer.current = setTimeout(() => setInstant(false), 300);
  }, []);

  /* ── Drag-to-reorder state ──────────────────────────────── */
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRects = useRef<DOMRect[]>([]);
  const dragState = useRef<{
    index: number;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    pointerId: number;
    target: Element;
    isTouch: boolean;
  } | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [settling, setSettling] = useState(false);

  // Measure all cell positions when drag starts
  const measureCells = useCallback(() => {
    if (!gridRef.current) return;
    const children = gridRef.current.children;
    cellRects.current = Array.from(children).map((el) =>
      (el as HTMLElement).getBoundingClientRect()
    );
  }, []);

  // Find which cell index a pointer is closest to
  const hitTest = useCallback((clientX: number, clientY: number) => {
    let closest = -1;
    let minDist = Infinity;
    for (let i = 0; i < cellRects.current.length; i++) {
      const r = cellRects.current[i];
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.abs(clientX - cx) + Math.abs(clientY - cy);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    return closest;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent, index: number) => {
    // Only left mouse / primary touch
    if (e.button !== 0) return;
    // Kill tooltips during drag
    setActiveTip(null);
    if (delayTimer.current) clearTimeout(delayTimer.current);

    measureCells();
    const rect = cellRects.current[index];
    if (!rect) return;

    const isTouch = e.pointerType === "touch";
    dragState.current = {
      index,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - (rect.left + rect.width / 2),
      offsetY: e.clientY - (rect.top + rect.height / 2),
      pointerId: e.pointerId,
      target: e.target as Element,
      isTouch,
    };

    // For mouse, capture immediately for smooth tracking.
    // For touch, defer capture so the browser can still scroll vertically.
    if (!isTouch) {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  }, [measureCells]);

  useEffect(() => {
    const DRAG_THRESHOLD = 4; // px before drag activates

    const onMove = (e: PointerEvent) => {
      const ds = dragState.current;
      if (!ds) return;

      const dx = e.clientX - ds.startX;
      const dy = e.clientY - ds.startY;

      // Activate drag after threshold
      if (dragIndex === null && Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;

      // For touch: if gesture is primarily vertical, it's a scroll — bail out
      if (ds.isTouch && dragIndex === null && Math.abs(dy) > Math.abs(dx)) {
        dragState.current = null;
        return;
      }

      if (dragIndex === null) {
        setDragIndex(ds.index);
        // For touch, capture now that we've confirmed horizontal drag intent
        if (ds.isTouch) {
          try { (ds.target as HTMLElement).setPointerCapture(ds.pointerId); } catch {}
        }
      }

      // Position relative to original cell center
      const rect = cellRects.current[ds.index];
      if (!rect) return;
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      setDragPos({
        x: e.clientX - ds.offsetX - originX,
        y: e.clientY - ds.offsetY - originY,
      });

      const target = hitTest(e.clientX, e.clientY);
      if (target >= 0) setOverIndex(target);
    };

    const onUp = () => {
      const ds = dragState.current;
      if (!ds || dragIndex === null) {
        // Never started dragging
        dragState.current = null;
        setDragIndex(null);
        setDragPos({ x: 0, y: 0 });
        setOverIndex(null);
        return;
      }

      const targetIdx = overIndex ?? ds.index;
      const targetRect = cellRects.current[targetIdx];
      const originRect = cellRects.current[ds.index];

      if (targetRect && originRect) {
        // Animate to target cell position
        const originX = originRect.left + originRect.width / 2;
        const originY = originRect.top + originRect.height / 2;
        const targetX = targetRect.left + targetRect.width / 2;
        const targetY = targetRect.top + targetRect.height / 2;

        setSettling(true);
        setDragPos({ x: targetX - originX, y: targetY - originY });

        // After settle animation, commit reorder
        setTimeout(() => {
          if (overIndex !== null && overIndex !== ds.index) {
            setItems((prev) => {
              const next = [...prev];
              const [moved] = next.splice(ds.index, 1);
              next.splice(overIndex, 0, moved);
              return next;
            });
          }
          dragState.current = null;
          setDragIndex(null);
          setDragPos({ x: 0, y: 0 });
          setOverIndex(null);
          setSettling(false);
        }, 200);
      } else {
        dragState.current = null;
        setDragIndex(null);
        setDragPos({ x: 0, y: 0 });
        setOverIndex(null);
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragIndex, overIndex, hitTest]);

  // Compute visual shift for each item during drag
  const getShiftTransform = useCallback((visualIndex: number) => {
    if (dragIndex === null || overIndex === null || dragIndex === overIndex) return undefined;
    const from = dragIndex;
    const to = overIndex;

    // Items between from and to shift by one cell
    if (from < to && visualIndex > from && visualIndex <= to) {
      // Shift left (take previous cell's position)
      const prev = cellRects.current[visualIndex - 1];
      const curr = cellRects.current[visualIndex];
      if (!prev || !curr) return undefined;
      return `translate(${prev.left - curr.left}px, ${prev.top - curr.top}px)`;
    }
    if (from > to && visualIndex >= to && visualIndex < from) {
      // Shift right (take next cell's position)
      const next = cellRects.current[visualIndex + 1];
      const curr = cellRects.current[visualIndex];
      if (!next || !curr) return undefined;
      return `translate(${next.left - curr.left}px, ${next.top - curr.top}px)`;
    }
    return undefined;
  }, [dragIndex, overIndex]);
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <NavBar showBack />

      {/* Main Content */}
      <main className="max-w-[48rem] mx-auto px-6 pt-8 sm:pt-20 pb-16">
        {/* Hero — image floated right, text fills around it */}
        <section className="pb-0 overflow-hidden">
          <h1 className="text-[24px] sm:text-[28px] font-[600] leading-[1.3] tracking-[-0.01em] text-[rgba(0,0,0,.85)] mb-4">
            Hi, I am Arunkumar Elangovan
          </h1>
          <img
            src="/images/about/me.jpg"
            alt="Arunkumar Elangovan"
            className="sm:hidden w-full rounded-lg object-cover mb-6"
          />
          <p className="text-[14px] leading-[1.6] tracking-[-0.005em] text-[rgba(0,0,0,.8)] mb-8">
            I am a Product Designer from Chennai, India. I believe in less is more. When I am not designing, I would probably be playing a guitar or admiring a new pair of sneakers. Addicted to everything fast, loud and aesthetic.
          </p>
        </section>

        {/* More about me */}
        <section className="pt-16">
          <div className="flex items-center gap-3 mb-6"><span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
            More About Me
          </span><div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { src: "/images/about/dog1.jpeg", caption: "I have a dog who is as curious as me." },
              { src: "/images/about/bike.jpg", caption: "I love to drive motorcycles where there are no roads." },
            ].map((img) => (
              <figure key={img.src} className="transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1">
                <div className="rounded-lg overflow-hidden bg-[var(--surface)]">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full block aspect-square object-cover"
                  />
                </div>
                <figcaption className="text-[12px] text-[rgba(0,0,0,.4)] mt-2 leading-[1.5]">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
            <figure className="transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1">
              <div className="rounded-lg overflow-hidden bg-[var(--surface)]">
                <img
                  src="/images/about/mountain.jpg"
                  alt="I sometimes trek and touch grass"
                  loading="lazy"
                  decoding="async"
                  className="w-full block aspect-square object-cover"
                />
              </div>
              <figcaption className="text-[12px] text-[rgba(0,0,0,.4)] mt-2 leading-[1.5]">
                I sometimes trek and touch grass.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* My toolkit */}
        <section className="pt-16">
          <div className="flex items-center gap-3 mb-6"><span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
            My Toolkit
          </span><div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" /></div>
          <div ref={gridRef} className="grid grid-cols-5 sm:grid-cols-10 gap-2" style={{ touchAction: "pan-y" }}>
            {items.map((tool, i) => {
              const isBeingDragged = dragIndex === i;
              const shift = getShiftTransform(i);
              const isOpen = activeTip === tool.name && dragIndex === null;
              const skipAnim = instant && isOpen;
              return (
                <div
                  key={tool.name}
                  className="relative"
                  style={{
                    transform: shift ?? "none",
                    transition: dragIndex !== null ? "transform 250ms var(--ease-out-quint)" : "none",
                  }}
                  onMouseEnter={() => dragIndex === null && handleEnter(tool.name)}
                  onMouseLeave={() => dragIndex === null && handleLeave()}
                >
                  <ToolIcon
                    tool={tool}
                    isDragging={isBeingDragged && !settling}
                    onPointerDown={(e) => !settling && handlePointerDown(e, i)}
                    style={isBeingDragged ? {
                      transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
                      transition: settling ? "transform 200ms var(--ease-out-quint)" : "none",
                      opacity: 1,
                    } : {
                      opacity: 1,
                    }}
                  />
                  {/* Tooltip */}
                  <span
                    className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[13px] leading-5 text-[rgba(0,0,0,.85)]"
                    style={{
                      backgroundColor: "canvas",
                      outline: "1px solid rgba(0,0,0,.1)",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,.06), 0 4px 6px -4px rgba(0,0,0,.06)",
                      transformOrigin: "bottom center",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "scale(1)" : "scale(0.9)",
                      transition: skipAnim ? "none" : "transform 150ms, opacity 150ms",
                      zIndex: 40,
                    }}
                  >
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Work Experience */}
        <section className="pt-16">
          <div className="flex items-center gap-3 mb-6"><span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
            Work Experience
          </span><div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" /></div>
          <div className="space-y-0">
            {workExperience.map((item) => (
              <div
                key={item.org}
                className="grid grid-cols-1 sm:grid-cols-[160px_160px_1fr] gap-x-8 gap-y-1 py-6 border-t border-[var(--border)] first:border-t-0 first:pt-0"
              >
                <div>
                  <span className="block text-[13px] text-[rgba(0,0,0,.55)]">{item.role}</span>
                  <span className="block text-[12px] text-[rgba(0,0,0,.35)] mt-0.5">{item.period}</span>
                </div>
                <span className="text-[13px] font-[550] text-[rgba(0,0,0,.85)]">{item.org}</span>
                <p className="text-[14px] leading-[1.5] text-[rgba(0,0,0,.8)]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="px-6 lg:px-20 py-8 border-t border-[var(--border)] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[12px] text-[rgba(0,0,0,.5)]">
          <p>
            Built with{" "}
            <Link href="https://nextjs.org" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Next.js</Link>
            ,{" "}
            <Link href="https://agentation.dev/" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Agentation</Link>
            {" & "}
            <Link href="https://claude.ai/code" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Claude Code</Link>
          </p>
          <div className="flex items-center gap-3">
            <Link href="https://x.com/AndreaLobster" target="_blank" rel="noopener noreferrer" className="text-[rgba(0,0,0,.4)] hover:text-[rgba(0,0,0,.8)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" aria-label="X (Twitter)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="https://linkedin.com/in/andrea-vollendorf" target="_blank" rel="noopener noreferrer" className="text-[rgba(0,0,0,.4)] hover:text-[rgba(0,0,0,.8)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </Link>
            <Link href="https://github.com/andreavollendorf" target="_blank" rel="noopener noreferrer" className="text-[rgba(0,0,0,.4)] hover:text-[rgba(0,0,0,.8)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
