"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";

export interface CoverImage {
  src: string;
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  company: string;
  year: string;
  coverDate?: string;
  coverImages: CoverImage[];
  hasCaseStudy?: boolean;
}

interface CarouselCard {
  projectSlug: string;
  projectTitle: string;
  projectDescription: string;
  image: CoverImage;
  hasCaseStudy: boolean;
}

function flattenToCards(projects: Project[]): CarouselCard[] {
  const cards: CarouselCard[] = [];
  for (const p of projects) {
    for (const img of p.coverImages) {
      cards.push({
        projectSlug: p.slug,
        projectTitle: p.title,
        projectDescription: p.description,
        image: img,
        hasCaseStudy: !!p.hasCaseStudy,
      });
    }
  }
  return cards;
}

export default function ProjectCarousel({
  projects,
  activeFilter = "all",
  transitioning = false,
}: {
  projects: Project[];
  activeFilter?: string;
  transitioning?: boolean;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const maxOffsetRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const didDragRef = useRef(false);
  const dragLockedRef = useRef<"horizontal" | "vertical" | null>(null);
  const velocityRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const lastMoveXRef = useRef(0);
  const momentumRafRef = useRef<number>(0);

  const [ready, setReady] = useState(false);

  const cursorPosRef = useRef<HTMLDivElement>(null);
  const cursorFadeRef = useRef<HTMLDivElement>(null);

  const onCardMouseMove = useCallback((e: React.MouseEvent) => {
    const pos = cursorPosRef.current;
    const container = outerRef.current;
    if (!pos || !container) return;
    const rect = container.getBoundingClientRect();
    pos.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
  }, []);

  const onCardMouseEnter = useCallback((e: React.MouseEvent) => {
    const pos = cursorPosRef.current;
    const fade = cursorFadeRef.current;
    const container = outerRef.current;
    if (!pos || !fade || !container) return;
    const rect = container.getBoundingClientRect();
    pos.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fade.style.opacity = "1";
      fade.style.transform = "scale(1)";
      return;
    }
    fade.style.transition = "none";
    fade.style.opacity = "0";
    fade.style.transform = "scale(0.1)";
    void fade.offsetHeight; // force reflow
    fade.style.transition =
      "opacity 250ms var(--ease-out-expo), transform 250ms var(--ease-out-expo)";
    fade.style.opacity = "1";
    fade.style.transform = "scale(1)";
  }, []);

  const onCardMouseLeave = useCallback(() => {
    const fade = cursorFadeRef.current;
    if (!fade) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fade.style.opacity = "0";
      return;
    }
    fade.style.transition =
      "opacity 150ms var(--ease-out-quart), transform 150ms var(--ease-out-quart)";
    fade.style.opacity = "0";
    fade.style.transform = "scale(0.1)";
  }, []);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.slug === activeFilter);

  const cards = flattenToCards(filtered);
  const cardCount = cards.length;

  const clampOffset = useCallback(() => {
    offsetRef.current = Math.max(0, Math.min(offsetRef.current, maxOffsetRef.current));
  }, []);

  const applyOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${-offsetRef.current}px)`;
  }, []);

  // Measure max scrollable distance
  useEffect(() => {
    const track = trackRef.current;
    const outer = outerRef.current;
    if (!track || !outer || cardCount === 0) return;

    const measure = () => {
      maxOffsetRef.current = Math.max(0, track.scrollWidth - outer.clientWidth);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(outer);
    return () => ro.disconnect();
  }, [cardCount]);

  // Wait for first set of images to load before revealing
  useEffect(() => {
    const track = trackRef.current;
    if (!track || cardCount === 0) return;

    const imgs = Array.from(track.querySelectorAll("img")).slice(0, Math.min(cardCount, 4));
    const allLoaded = imgs.every((img) => img.complete && img.naturalWidth > 0);
    if (allLoaded) {
      setReady(true);
      return;
    }

    let loaded = imgs.filter((img) => img.complete && img.naturalWidth > 0).length;
    const check = () => {
      loaded++;
      if (loaded >= imgs.length) setReady(true);
    };
    imgs.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) return;
      img.addEventListener("load", check, { once: true });
      img.addEventListener("error", check, { once: true });
    });

    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, [cardCount]);

  // Reset on filter change
  useEffect(() => {
    offsetRef.current = 0;
    applyOffset();
  }, [activeFilter, applyOffset]);

  // Auto-scroll (stops at end, pauses on hover/drag)
  const stoppedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    const outer = outerRef.current;
    if (!track || !outer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;

    const animate = () => {
      if (stoppedRef.current || offsetRef.current >= maxOffsetRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      if (!visible) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      offsetRef.current += 0.55;
      clampOffset();
      applyOffset();
      rafRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 },
    );

    observer.observe(outer);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [applyOffset, clampOffset]);

  // Wheel handler (desktop only)
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const handleWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      // At the edges, let the page scroll naturally
      const atStart = offsetRef.current <= 0 && delta < 0;
      const atEnd = offsetRef.current >= maxOffsetRef.current && delta > 0;
      if (atStart || atEnd) return;

      e.preventDefault();
      stoppedRef.current = true;
      offsetRef.current += delta;
      clampOffset();
      applyOffset();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [applyOffset, clampOffset]);

  // Momentum glide after swipe release
  const startMomentum = useCallback(() => {
    cancelAnimationFrame(momentumRafRef.current);
    const friction = 0.95;
    const glide = () => {
      if (Math.abs(velocityRef.current) < 0.5) {
        clampOffset();
        applyOffset();
        return;
      }
      velocityRef.current *= friction;
      offsetRef.current += velocityRef.current;
      clampOffset();
      applyOffset();
      momentumRafRef.current = requestAnimationFrame(glide);
    };
    momentumRafRef.current = requestAnimationFrame(glide);
  }, [applyOffset, clampOffset]);

  // Drag/swipe handler (all devices)
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const isDesktop = !window.matchMedia("(hover: none)").matches;
    let pointerId = -1;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (pointerId !== -1 && e.pointerId !== pointerId) {
        draggingRef.current = false;
        if (didDragRef.current) {
          try { el.releasePointerCapture(pointerId); } catch {}
        }
        el.style.cursor = "";
        pointerId = -1;
        return;
      }
      cancelAnimationFrame(momentumRafRef.current);
      draggingRef.current = true;
      didDragRef.current = false;
      dragLockedRef.current = null;
      dragStartXRef.current = e.clientX;
      dragStartYRef.current = e.clientY;
      dragStartOffsetRef.current = offsetRef.current;
      velocityRef.current = 0;
      lastMoveXRef.current = e.clientX;
      lastMoveTimeRef.current = Date.now();
      pointerId = e.pointerId;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || e.pointerId !== pointerId) return;
      const dx = dragStartXRef.current - e.clientX;
      const dy = dragStartYRef.current - e.clientY;

      if (!dragLockedRef.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        dragLockedRef.current =
          Math.abs(dx) >= Math.abs(dy) ? "horizontal" : "vertical";
      }

      if (dragLockedRef.current === "vertical") {
        draggingRef.current = false;
        return;
      }

      if (dragLockedRef.current === "horizontal" && !didDragRef.current) {
        didDragRef.current = true;
        el.setPointerCapture(pointerId);
        if (isDesktop) el.style.cursor = "grabbing";
      }

      if (didDragRef.current) {
        const now = Date.now();
        const dt = now - lastMoveTimeRef.current;
        if (dt > 0) {
          velocityRef.current = (lastMoveXRef.current - e.clientX) / dt * 16;
        }
        lastMoveXRef.current = e.clientX;
        lastMoveTimeRef.current = now;

        offsetRef.current = dragStartOffsetRef.current + dx;
        clampOffset();
        applyOffset();
      }
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      dragLockedRef.current = null;
      if (didDragRef.current && pointerId !== -1) {
        try {
          el.releasePointerCapture(pointerId);
        } catch {}
        startMomentum();
      } else {
        clampOffset();
        applyOffset();
      }
      el.style.cursor = "";
      pointerId = -1;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      cancelAnimationFrame(momentumRafRef.current);
    };
  }, [applyOffset, clampOffset, startMomentum]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (didDragRef.current) {
      e.preventDefault();
    }
  }, []);

  return (
    <div
      ref={outerRef}
      className="overflow-hidden scrollbar-hide select-none relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onMouseEnter={() => { stoppedRef.current = true; }}
      onMouseLeave={() => { stoppedRef.current = false; }}
      style={{
        touchAction: "pan-y pinch-zoom",
        opacity: transitioning || !ready ? 0 : 1,
        transition: "opacity 300ms ease",
      }}
    >
      {/* Custom cursor — desktop only */}
      <div
        ref={cursorPosRef}
        aria-hidden
        className="absolute top-0 left-0 z-50 pointer-events-none hidden [@media(hover:hover)]:block"
        style={{ willChange: "transform" }}
      >
        <div
          ref={cursorFadeRef}
          style={{
            opacity: 0,
            transform: "scale(0.1)",
            transition:
              "opacity 150ms var(--ease-out-quart), transform 150ms var(--ease-out-quart)",
          }}
        >
          <span className="block -translate-x-1/2 -translate-y-1/2 rounded-lg text-white text-[13px] font-[500] px-4 py-1.5 whitespace-nowrap" style={{ backgroundColor: "rgba(0,0,0,.85)", boxShadow: "0 4px 24px rgba(0,0,0,.12)" }}>
            View Case Study
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex items-start gap-5 pl-6 lg:pl-20 pr-6 lg:pr-20"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {cards.map((card, i) => {
          const imageContent = (
            <div className="relative h-[360px] sm:h-[480px] rounded-lg bg-[var(--surface)] overflow-hidden p-[40px] flex items-center justify-center">
              <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
              <img
                src={card.image.src}
                alt={
                  card.image.alt ||
                  `${card.projectTitle} — ${card.projectDescription}`
                }
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="h-full w-auto"
              />
            </div>
          );

          const label = (
            <div className="h-[44px] overflow-hidden">
              <div className="translate-y-0 sm:translate-y-[-100%] sm:group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-200 ease-[var(--ease-out-quart)] pt-3 flex items-baseline justify-between">
                <span className="text-[13px] font-[550] text-[rgba(0,0,0,.85)]">
                  {card.projectTitle}
                </span>
                {card.hasCaseStudy ? (
                  <span className="text-[11px] font-[450] text-[rgba(0,0,0,.4)]">
                    View Case Study →
                  </span>
                ) : null}
              </div>
            </div>
          );

          if (card.hasCaseStudy) {
            return (
              <Link
                key={`${card.projectSlug}-${card.image.src}-${i}`}
                href={`/case-study/${card.projectSlug}`}
                aria-label={`${card.projectTitle} — ${card.projectDescription}`}
                className="shrink-0 group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none cursor-pointer [@supports(cursor:none)]:cursor-none"
                onClick={handleClick}
                onMouseMove={onCardMouseMove}
                onMouseEnter={onCardMouseEnter}
                onMouseLeave={onCardMouseLeave}
                draggable={false}
              >
                {imageContent}
                {label}
              </Link>
            );
          }

          return (
            <div
              key={`${card.projectSlug}-${card.image.src}-${i}`}
              className="shrink-0 group"
              draggable={false}
            >
              {imageContent}
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
