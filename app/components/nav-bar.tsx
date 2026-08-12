"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WorkDropdown from "./work-dropdown";
import ContactDropdown from "./contact-dropdown";
import MobileMenu from "./mobile-menu";
import { caseStudies } from "../data/case-studies";

const EN = 'Arunkumar Elangovan';
const TA = 'அருண்குமார் இளங்கோவன்';
const MAT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&*';

function matrixTo(el: HTMLElement, target: string, font: string, size?: string): Promise<void> {
  el.style.fontFamily = font;
  el.style.letterSpacing = font.includes('tamil') ? '0' : '-.01em';
  el.style.fontSize = size ?? '';
  const dur = 420;
  const start = performance.now();
  return new Promise(resolve => {
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const reveal = Math.floor(p * target.length);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        out += ch === ' ' ? ' ' : i < reveal ? ch : MAT[Math.floor(Math.random() * MAT.length)];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(tick);
      else { el.textContent = target; resolve(); }
    };
    requestAnimationFrame(tick);
  });
}

export default function NavBar({
  showBack,
  scrollTitle,
}: {
  showBack?: boolean;
  scrollTitle?: string;
} = {}) {
  const [visible, setVisible] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const lastScrollY = useRef(0);
  const nameRef = useRef<HTMLSpanElement>(null);
  const nameBusy = useRef(false);
  const nameHovered = useRef(false);

  const handleNameEnter = async () => {
    nameHovered.current = true;
    if (nameBusy.current || !nameRef.current) return;
    nameBusy.current = true;
    await matrixTo(nameRef.current, TA, 'var(--font-tamil), serif', '16px');
    nameBusy.current = false;
    if (!nameHovered.current && nameRef.current) {
      nameBusy.current = true;
      await matrixTo(nameRef.current, EN, 'var(--font-mackinac), serif');
      nameBusy.current = false;
    }
  };

  const handleNameLeave = async () => {
    nameHovered.current = false;
    if (nameBusy.current || !nameRef.current) return;
    nameBusy.current = true;
    await matrixTo(nameRef.current, EN, 'var(--font-mackinac), serif');
    nameBusy.current = false;
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Hide/show on scroll
      if (y < 60) setVisible(true);
      else if (y < lastScrollY.current) setVisible(true);
      else if (y > lastScrollY.current + 5) setVisible(false);
      lastScrollY.current = y;

      // Show title after scrolling past hero
      if (scrollTitle) setShowTitle(y > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTitle]);

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 transition-transform duration-300 will-change-transform ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        zIndex: "var(--z-nav)",
        transitionTimingFunction: "var(--ease-out-quart)",
        backgroundColor: "color-mix(in srgb, var(--background) 50%, transparent)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(0,0,0,.06)",
      }}
    >
      <div className="flex items-center justify-between py-3 mx-auto" style={{ paddingLeft: 'clamp(1.1rem, 2.2vw, 2.1rem)', paddingRight: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}>
        {/* Left: logo or back link */}
        {showBack ? (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] text-[rgba(0,0,0,.55)] link-hover press-scale touch-hitbox transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5.5 4L1.5 8M1.5 8L5.5 12M1.5 8H10C11.3807 8 12.5 6.88071 12.5 5.5V5.5C12.5 4.11929 11.3807 3 10 3H8.5" stroke="currentColor"/>
            </svg>
            <span>Home</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="text-[18px] whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
            onMouseEnter={handleNameEnter}
            onMouseLeave={handleNameLeave}
          >
            <span
              ref={nameRef}
              style={{ fontFamily: "var(--font-mackinac), serif", fontWeight: 600, letterSpacing: "-.01em" }}
            >
              Arunkumar Elangovan
            </span>
          </Link>
        )}

        {/* Center: scroll title (optional) */}
        {scrollTitle && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className={`hidden sm:block absolute left-1/2 -translate-x-1/2 text-[14px] font-[550] transition-[opacity,transform] duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
          >
            {scrollTitle.replace(/\.$/, "")}
          </button>
        )}

        {/* Right: nav items */}
        <div className="hidden sm:flex items-center gap-[8px]">
          <Link
            href="/about"
            className="text-[14px] font-[450] text-[rgba(0,0,0,.55)] link-hover hover:bg-[var(--surface)] transition-colors h-8 px-3 flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-[14px] font-[450] text-[rgba(0,0,0,.55)] link-hover hover:bg-[var(--surface)] transition-colors h-8 px-3 flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none ml-[8px]"
          >
            Blog
          </Link>
          <div className="ml-[6px]"><WorkDropdown caseStudies={caseStudies} /></div>
          <ContactDropdown />
        </div>
        {/* Mobile */}
        <div className="sm:hidden">
          <MobileMenu caseStudies={caseStudies} />
        </div>
      </div>
    </nav>
  );
}
