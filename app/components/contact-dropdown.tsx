"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const EASE_OUT_QUART = "var(--ease-out-quart)";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Contact Icon Hover Micro-interactions
 *
 * Each icon has a unique motion triggered on menu-item hover.
 * None repeat the case study animations (float, spin, pulse).
 *
 *  Email    wobble — tilts rotateZ to -12°, then settles back
 *  LinkedIn nudge  — shifts x: +5px, then settles back
 *  Resume   swing  — pendulum tilt rotateZ: 15° from top, then settles back
 *
 *    rest   icon at identity transform
 *   hover   icon animates to target with spring
 *   +hold   holds at target for holdDuration ms
 *  settle   eases back to rest (spring)
 * ───────────────────────────────────────────────────────── */

const REST = { x: 0, rotate: 0 };
const HOLD_DURATION = 150;
const SPRING = { type: "spring" as const, visualDuration: 0.3, bounce: 0.25 };

const getIconTarget = (label: string) => {
  switch (label) {
    case "Email":    return { ...REST, rotate: -12 };
    case "LinkedIn": return { ...REST, x: 5 };
    case "Resume":   return { ...REST, rotate: 15 };
    default:         return REST;
  }
};

export function EmailIcon({ colored = false }: { colored?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g clipPath="url(#contact-email-clip)">
        <path d="M24 15.5996L12 24L0 15.5996L5.14258 12L12 16.7998L18.8574 12L24 15.5996Z" className={colored ? "fill-[#C4E8D1]" : "fill-[#E1E3E8] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#C4E8D1]"} />
        <path d="M24 8.40039L18.8564 11.999L12 7.2002L5.14258 11.999L0 8.40039L12 0L24 8.40039Z" className={colored ? "fill-[#30A46C]" : "fill-[#8790A1] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#30A46C]"} />
      </g>
      <defs>
        <clipPath id="contact-email-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

export function LinkedInIcon({ colored = false }: { colored?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g clipPath="url(#contact-in-clip)">
        <path d="M0 8H6V24H0V8Z" className={colored ? "fill-[#C2E5FF]" : "fill-[#E1E3E8] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#C2E5FF]"} />
        <circle cx="3" cy="3" r="3" className={colored ? "fill-[#0090FF]" : "fill-[#8790A1] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#0090FF]"} />
        <path d="M6 17C6 12.0294 10.0294 8 15 8V8C19.9706 8 24 12.0294 24 17V24H6V17Z" className={colored ? "fill-[#0090FF]" : "fill-[#8790A1] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#0090FF]"} />
        <path d="M12 17C12 15.3431 13.3431 14 15 14C16.6569 14 18 15.3431 18 17V24H12V17Z" className={colored ? "fill-[#C2E5FF]" : "fill-[#E1E3E8] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#C2E5FF]"} />
      </g>
      <defs>
        <clipPath id="contact-in-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

export function ResumeIcon({ colored = false }: { colored?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g clipPath="url(#contact-resume-clip)">
        <path d="M23.3137 17.6569L17.6569 23.3137L12 17.6569H17.6569V12L23.3137 17.6569ZM6.34315 17.6569H12L6.34315 23.3137L0.686291 17.6569L6.34315 12V17.6569ZM23.3137 6.34315L17.6569 12V6.34315H12L17.6569 0.686292L23.3137 6.34315ZM12 6.34315H6.34315V12L0.686291 6.34315L6.34315 0.686292L12 6.34315Z" className={colored ? "fill-[#D6409F]" : "fill-[#8790A1] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#D6409F]"} />
        <rect x="6.34315" y="12" width="8" height="8" transform="rotate(-45 6.34315 12)" className={colored ? "fill-[#F6CEE7]" : "fill-[#E1E3E8] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#F6CEE7]"} />
      </g>
      <defs>
        <clipPath id="contact-resume-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

export const CONTACT_ITEMS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arunkumar-elangovan10/",
    description: "Let's connect",
    external: true,
    download: false,
    Icon: LinkedInIcon,
  },
  {
    label: "Resume",
    href: "/Arunkumar_elangovan_Resume.pdf",
    description: "Download PDF",
    external: false,
    download: true,
    Icon: ResumeIcon,
  },
];

export default function ContactDropdown() {
  const [open, setOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const exitTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelId = "contact-dropdown-panel";

  // Hold timer: after hovering, wait holdDuration then settle back
  useEffect(() => {
    clearTimeout(settleTimer.current);
    setSettled(false); // eslint-disable-line react-hooks/set-state-in-effect -- derived state reset on hover change

    if (hoveredIdx !== null) {
      settleTimer.current = setTimeout(() => {
        setSettled(true);
      }, HOLD_DURATION);
    }

    return () => clearTimeout(settleTimer.current);
  }, [hoveredIdx]);

  // Reset icon hover when dropdown closes
  useEffect(() => {
    if (!open) {
      setHoveredIdx(null); // eslint-disable-line react-hooks/set-state-in-effect -- state reset on close
      setSettled(false);
    }
  }, [open]);

  // Ref-driven panel animation — asymmetric enter/exit
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    clearTimeout(exitTimer.current);

    if (open) {
      panel.style.transition = `opacity 200ms ${EASE_OUT_QUART}, transform 200ms ${EASE_OUT_QUART}`;
      panel.style.opacity = "1";
      panel.style.transform = "translateY(0)";
      panel.style.pointerEvents = "auto";
    } else {
      panel.style.transition = `opacity 150ms ${EASE_OUT_QUART}`;
      panel.style.opacity = "0";
      panel.style.pointerEvents = "none";
      exitTimer.current = setTimeout(() => {
        panel.style.transition = "none";
        panel.style.transform = "translateY(-8px)";
      }, 150);
    }

    return () => clearTimeout(exitTimer.current);
  }, [open]);

  // Close when another nav dropdown opens
  useEffect(() => {
    const handleOtherOpen = (e: Event) => {
      if ((e as CustomEvent).detail !== "contact") {
        setOpen(false);
      }
    };
    document.addEventListener("nav-dropdown-open", handleOtherOpen);
    return () => document.removeEventListener("nav-dropdown-open", handleOtherOpen);
  }, []);

  const showMenu = useCallback(() => {
    clearTimeout(leaveTimer.current);
    document.dispatchEvent(new CustomEvent("nav-dropdown-open", { detail: "contact" }));
    setOpen(true);
  }, []);

  const keepAlive = useCallback(() => {
    clearTimeout(leaveTimer.current);
  }, []);

  const hideMenu = useCallback(() => {
    clearTimeout(leaveTimer.current);
    setOpen(false);
  }, []);

  const scheduleHide = useCallback(() => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(hideMenu, 100);
  }, [hideMenu]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearTimeout(leaveTimer.current);
      clearTimeout(exitTimer.current);
      clearTimeout(settleTimer.current);
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        hideMenu();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, hideMenu]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;
    const handleScroll = () => hideMenu();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, hideMenu]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.closest("[data-contact-wrapper]")?.contains(target)
      ) {
        hideMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, hideMenu]);

  const handleMouseEnter = useCallback(() => {
    if (open) {
      keepAlive();
    } else {
      showMenu();
    }
  }, [open, keepAlive, showMenu]);

  return (
    <div
      className="relative"
      data-contact-wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={scheduleHide}
    >
      <button
        ref={triggerRef}
        onClick={() => (open ? hideMenu() : showMenu())}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        className="text-[14px] font-[450] text-[rgba(0,0,0,.55)] link-hover press-scale hover:bg-[var(--surface)] transition-colors h-8 px-3 flex items-center gap-1 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none"
      >
        Contact
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 will-change-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M2.5 4L5 6.5L7.5 4" />
        </svg>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        role="menu"
        aria-hidden={!open}
        className="absolute right-0 top-full mt-2 z-[var(--z-dropdown)] bg-[var(--background)] rounded-lg overflow-hidden w-[280px]"
        style={{
          boxShadow: "var(--shadow-floating)",
          opacity: 0,
          transform: "translateY(-8px)",
          pointerEvents: "none",
        }}
      >
        <div className="p-2">
          {CONTACT_ITEMS.map((item, i) => {
            const isActive = hoveredIdx === i && !settled;
            const animateProps = isActive ? getIconTarget(item.label) : REST;

            const linkClass = "group flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-[var(--surface-hover)] focus-visible:bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--foreground)] outline-none";
            const sharedProps = {
              role: "menuitem" as const,
              tabIndex: open ? 0 : -1,
              className: linkClass,
              onClick: hideMenu,
              onMouseEnter: () => setHoveredIdx(i),
              onMouseLeave: () => setHoveredIdx(null),
            };

            return item.download ? (
              <a
                key={item.label}
                {...sharedProps}
                href={item.href}
                download
              >
                <div className="w-14 h-14 rounded-lg bg-white flex-shrink-0 flex items-center justify-center" style={{ boxShadow: "var(--shadow-flush)" }}>
                  <motion.div
                    animate={animateProps}
                    transition={SPRING}
                    style={item.label === "Resume" ? { transformOrigin: "top center" } : undefined}
                  >
                    <item.Icon />
                  </motion.div>
                </div>
                <div>
                  <span className="block text-[13px] font-[550] text-[rgba(0,0,0,.85)] leading-tight">
                    {item.label}
                  </span>
                  <span className="block text-[12px] text-[rgba(0,0,0,.45)] leading-tight mt-0.5">
                    {item.description}
                  </span>
                </div>
              </a>
            ) : (
              <Link
                key={item.label}
                {...sharedProps}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <div className="w-14 h-14 rounded-lg bg-white flex-shrink-0 flex items-center justify-center" style={{ boxShadow: "var(--shadow-flush)" }}>
                  <motion.div
                    animate={animateProps}
                    transition={SPRING}
                    style={item.label === "Resume" ? { transformOrigin: "top center" } : undefined}
                  >
                    <item.Icon />
                  </motion.div>
                </div>
                <div>
                  <span className="block text-[13px] font-[550] text-[rgba(0,0,0,.85)] leading-tight">
                    {item.label}
                  </span>
                  <span className="block text-[12px] text-[rgba(0,0,0,.45)] leading-tight mt-0.5">
                    {item.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
