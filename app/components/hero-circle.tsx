'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─── Constants ──────────────────────────────────────────── */
const MAT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&*';
const STAGE_TWEEN_MS = 1400;

const FACTS = [
  'Behind the scenes - Spotify, caffeine and nicotine',
  'Plot twist: half of this UI was nudged by 2px at 1 AM.',
  'Debug fuel today: cold coffee and dramatic playlists.',
  'I trust Figma, but I verify everything in the browser.',
  'Spent 20 minutes fixing a 1px alignment. Worth it.',
  'Current superpower: turning vague ideas into neat interfaces.',
  'If it ships fast and looks clean, I call it a good day.',
  'Design rule: if it feels obvious, it is probably right.',
  'Yes, I renamed files three times for inner peace.',
  'Hidden feature: this footer changes while I keep building.',
];

const TITLES = [
  'Batman', 'Spirited Phoenix', 'Time Traveler', 'Watch Watcher',
  'Power Ranger', 'Traveling Soldier', 'Pixel Wizard', 'Coffee Alchemist',
  'Midnight Debugger', 'Chaos Tamer', 'UI Archaeologist',
  'Professional Overthinker', 'Idea DJ', 'Meme Curator',
  'Deadline Sprinter', 'Dream Cartographer',
];

const BLOCKED_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);

/* ─── Math helpers ───────────────────────────────────────── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerpHex(from: string, to: string, t: number) {
  const f = from.replace('#', '');
  const s = to.replace('#', '');
  const r = Math.round(lerp(parseInt(f.slice(0, 2), 16), parseInt(s.slice(0, 2), 16), t));
  const g = Math.round(lerp(parseInt(f.slice(2, 4), 16), parseInt(s.slice(2, 4), 16), t));
  const b = Math.round(lerp(parseInt(f.slice(4, 6), 16), parseInt(s.slice(4, 6), 16), t));
  return `rgb(${r} ${g} ${b})`;
}

/* ─── Component ──────────────────────────────────────────── */
export default function HeroCircle() {
  const rootRef        = useRef<HTMLElement>(null);
  const heroCenterRef  = useRef<HTMLDivElement>(null);
  const circleRef      = useRef<HTMLDivElement>(null);
  const arunGroupRef   = useRef<HTMLDivElement>(null);
  const merlinGroupRef = useRef<HTMLDivElement>(null);
  const moeGroupRef    = useRef<HTMLDivElement>(null);
  const hippoGroupRef  = useRef<HTMLDivElement>(null);
  const designerTextRef = useRef<HTMLSpanElement>(null);
  const refreshBtnRef  = useRef<HTMLButtonElement>(null);
  const cursorRef      = useRef<HTMLDivElement>(null);
  const factRef        = useRef<HTMLParagraphElement>(null);

  /* Mutable animation state — no re-renders needed */
  const s = useRef({
    vProgress: 0,
    targetProgress: 0,
    stageIdx: 0,
    animating: false,
    rafId: null as number | null,
    stageStartProgress: 0,
    stageStartTime: 0,
    touchStartY: null as number | null,
    wheelAcc: 0,
    lockUntil: 0,
    factQueue: [] as string[],
    currentFact: FACTS[0],
    layoutCache: null as { rect: DOMRect; vw: number; vh: number } | null,
    seenTitles: [] as string[],
    refreshBusy: false,
  });

  useEffect(() => {
    const root       = rootRef.current;
    const heroCenter = heroCenterRef.current;
    const circle     = circleRef.current;
    const arunGroup  = arunGroupRef.current;
    const merlinGroup = merlinGroupRef.current;
    const moeGroup   = moeGroupRef.current;
    const hippoGroup = hippoGroupRef.current;
    const cursor     = cursorRef.current;
    const factEl     = factRef.current;
    const refreshBtn = refreshBtnRef.current;
    const designerText = designerTextRef.current;
    const st         = s.current;

    if (!root || !heroCenter || !arunGroup || !merlinGroup || !moeGroup || !hippoGroup) return;

    /* Layout cache */
    function getLayout() {
      if (!st.layoutCache) {
        st.layoutCache = {
          rect: heroCenter!.getBoundingClientRect(),
          vw: window.innerWidth  || 1,
          vh: window.innerHeight || 1,
        };
      }
      return st.layoutCache;
    }

    /* Apply animation frame */
    function apply(progress: number) {
      const { rect, vw, vh } = getLayout();
      const R = vw * 0.5;
      const cx = 0, cy = vh * 0.5;
      const stage1 = Math.min(Math.max(progress, 0), 1);
      const stage2 = Math.min(Math.max(progress - 1, 0), 1);
      const stage3 = Math.min(Math.max(progress - 2, 0), 1);

      const toXY = (deg: number) => {
        const rad = (Math.PI / 180) * deg;
        return { x: cx + R * Math.cos(rad) - rect.left, y: cy + R * Math.sin(rad) - rect.top };
      };

      // Arun
      const arunPos  = toXY(lerp(0, -58, stage1));
      const arunFade = 1 - smoothstep(0.04, 0.9, stage1);
      arunGroup!.style.left      = `${arunPos.x}px`;
      arunGroup!.style.top       = `${arunPos.y}px`;
      arunGroup!.style.transform = `translate(-50%,-50%) rotate(${lerp(0, -6, stage1)}deg)`;
      arunGroup!.style.opacity   = `${Math.max(arunFade, 0)}`;

      // Merlin
      const mAngle   = progress <= 1 ? lerp(58, 0, stage1) : lerp(0, -58, stage2);
      const mPos     = toXY(mAngle);
      const mFade    = progress <= 1 ? smoothstep(0.08, 0.92, stage1) : 1 - smoothstep(0.08, 0.9, stage2);
      const mRot     = progress <= 1 ? lerp(8, 0, stage1) : lerp(0, -6, stage2);
      merlinGroup!.style.left          = `${mPos.x}px`;
      merlinGroup!.style.top           = `${mPos.y}px`;
      merlinGroup!.style.transform     = `translate(-50%,-50%) rotate(${mRot}deg)`;
      merlinGroup!.style.opacity       = `${Math.max(mFade, 0)}`;
      merlinGroup!.style.pointerEvents = mFade > 0.35 ? 'auto' : 'none';

      // MoEngage
      const eAngle = progress <= 2 ? lerp(58, 0, stage2) : lerp(0, -58, stage3);
      const ePos   = toXY(eAngle);
      const eFade  = progress <= 2 ? smoothstep(0.1, 0.94, stage2) : 1 - smoothstep(0.08, 0.9, stage3);
      const eRot   = progress <= 2 ? lerp(8, 0, stage2) : lerp(0, -6, stage3);
      moeGroup!.style.left          = `${ePos.x}px`;
      moeGroup!.style.top           = `${ePos.y}px`;
      moeGroup!.style.transform     = `translate(-50%,-50%) rotate(${eRot}deg)`;
      moeGroup!.style.opacity       = `${Math.max(eFade, 0)}`;
      moeGroup!.style.pointerEvents = eFade > 0.35 ? 'auto' : 'none';

      // Hippo Video
      const hPos  = toXY(lerp(58, 0, stage3));
      const hFade = smoothstep(0.1, 0.94, stage3);
      hippoGroup!.style.left          = `${hPos.x}px`;
      hippoGroup!.style.top           = `${hPos.y}px`;
      hippoGroup!.style.transform     = `translate(-50%,-50%) rotate(${lerp(8, 0, stage3)}deg)`;
      hippoGroup!.style.opacity       = `${Math.max(hFade, 0)}`;
      hippoGroup!.style.pointerEvents = hFade > 0.35 ? 'auto' : 'none';

      // Circle gradient
      const cStart = progress <= 1 ? lerpHex('#FFFFFF','#B7C9F9', stage1)
                   : progress <= 2 ? lerpHex('#B7C9F9','#A9A7FF', stage2)
                   : lerpHex('#A9A7FF','#DBFFD3', stage3);
      const cEnd   = progress <= 1 ? lerpHex('#B7C9F9','#A9A7FF', stage1)
                   : progress <= 2 ? lerpHex('#A9A7FF','#DBFFD3', stage2)
                   : lerpHex('#DBFFD3','#F1C26A', stage3);
      if (circle) {
        circle.style.background = `linear-gradient(180deg, ${cStart} 0%, ${cEnd} 100%)`;
      }
    }

    /* RAF tween */
    function animRAF(now: number) {
      const elapsed = Math.max(0, now - st.stageStartTime);
      const t = Math.min(elapsed / STAGE_TWEEN_MS, 1);
      st.vProgress = lerp(st.stageStartProgress, st.targetProgress, easeInOutCubic(t));
      apply(st.vProgress);
      if (t < 1) {
        st.rafId = requestAnimationFrame(animRAF);
      } else {
        st.vProgress = st.targetProgress;
        apply(st.vProgress);
        st.rafId = null;
        st.animating = false;
        st.wheelAcc = 0;
        st.lockUntil = performance.now() + 220;
      }
    }

    function goToStage(next: number) {
      const clamped = Math.min(3, Math.max(0, next));
      if (clamped === st.stageIdx) return;
      st.stageIdx = clamped;
      st.stageStartProgress = st.vProgress;
      st.stageStartTime = performance.now();
      st.targetProgress = st.stageIdx;
      st.animating = true;
      st.wheelAcc = 0;
      st.touchStartY = null;
      if (st.rafId === null) st.rafId = requestAnimationFrame(animRAF);
    }

    /* Fact rotation */
    function rotateFact() {
      if (!factEl) return;
      if (st.factQueue.length === 0)
        st.factQueue = FACTS.filter(f => f !== st.currentFact).sort(() => Math.random() - 0.5);
      const next = st.factQueue.shift();
      if (!next) return;
      factEl.style.opacity = '0.4';
      factEl.style.transform = 'translateY(2px)';
      setTimeout(() => {
        factEl!.textContent = next;
        st.currentFact = next;
        factEl!.style.opacity = '';
        factEl!.style.transform = '';
      }, 170);
    }

    /* Matrix text transition */
    function matrixText(el: HTMLElement, next: string): Promise<void> {
      const dur = 460;
      const start = performance.now();
      return new Promise(resolve => {
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const reveal = Math.floor(p * next.length);
          let out = '';
          for (let i = 0; i < next.length; i++) {
            const ch = next[i];
            out += ch === ' ' ? ' ' : i < reveal ? ch : MAT_CHARS[Math.floor(Math.random() * MAT_CHARS.length)];
          }
          el.textContent = out;
          if (p < 1) requestAnimationFrame(tick);
          else { el.textContent = next; resolve(); }
        };
        requestAnimationFrame(tick);
      });
    }

    /* Refresh button */
    async function handleRefresh() {
      if (!designerText || !refreshBtn || st.refreshBusy) return;
      st.refreshBusy = true;
      refreshBtn.style.transform = 'rotate(360deg)';
      refreshBtn.style.transition = 'transform 280ms ease-out';
      const pool = TITLES.filter(t => !st.seenTitles.includes(t));
      if (!pool.length) { st.refreshBusy = false; return; }
      const next = pool[Math.floor(Math.random() * pool.length)];
      await matrixText(designerText, next);
      st.seenTitles.push(next);
      setTimeout(() => {
        if (refreshBtn) { refreshBtn.style.transform = ''; refreshBtn.style.transition = ''; }
        st.refreshBusy = false;
      }, 170);
    }

    /* Custom cursor */
    const onEnter = () => { if (cursor) cursor.style.opacity = '1'; };
    const onLeave = () => { if (cursor) cursor.style.opacity = '0'; };
    const onMove  = (e: MouseEvent) => {
      if (cursor) { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; }
    };
    [merlinGroup, moeGroup, hippoGroup].forEach(g => {
      g.addEventListener('mouseenter', onEnter);
      g.addEventListener('mouseleave', onLeave);
      g.addEventListener('mousemove', onMove as EventListener);
    });

    /* Scroll / wheel / touch */
    const onWheel = (e: WheelEvent) => {
      const tag = (e.target as Element)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      e.preventDefault();
      if (st.animating || performance.now() < st.lockUntil) return;
      st.wheelAcc += e.deltaY;
      if (Math.abs(st.wheelAcc) < 18) return;
      goToStage(st.stageIdx + (st.wheelAcc > 0 ? 1 : -1));
      st.wheelAcc = 0;
    };
    const onTouchStart = (e: TouchEvent) => { if (e.touches?.length) st.touchStartY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      if (!e.touches?.length || st.touchStartY === null) return;
      const delta = st.touchStartY - e.touches[0].clientY;
      if (st.animating || performance.now() < st.lockUntil) { e.preventDefault(); return; }
      if (Math.abs(delta) > 24) {
        goToStage(st.stageIdx + (delta > 0 ? 1 : -1));
        st.touchStartY = e.touches[0].clientY;
      }
      e.preventDefault();
    };
    const onKeyDown = (e: KeyboardEvent) => { if (BLOCKED_KEYS.has(e.key)) e.preventDefault(); };
    const onResize  = () => { st.layoutCache = null; };

    refreshBtn?.addEventListener('click', handleRefresh);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('resize', onResize);

    /* Init */
    apply(0);
    window.scrollTo(0, 0);
    const factInterval = setInterval(rotateFact, 10_000);

    return () => {
      refreshBtn?.removeEventListener('click', handleRefresh);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      [merlinGroup, moeGroup, hippoGroup].forEach(g => {
        g.removeEventListener('mouseenter', onEnter);
        g.removeEventListener('mouseleave', onLeave);
        g.removeEventListener('mousemove', onMove as EventListener);
      });
      clearInterval(factInterval);
      if (st.rafId !== null) cancelAnimationFrame(st.rafId);
    };
  }, []);

  /* Square size shared across all groups */
  const SQ = 'min(42vw, 260px)';

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden"
      style={{
        height: '100svh',
        marginTop: '-3.75rem',
        isolation: 'isolate',
      }}
    >
      {/* Gradient circle — bleeds up behind the sticky nav for the glass effect */}
      <div
        ref={circleRef}
        className="absolute rounded-full pointer-events-none -z-10"
        style={{
          width: '100vw', height: '100vw',
          left: 0, top: '50vh',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(180deg, #ffffff 0%, #B7C9F9 100%)',
        }}
      />

      {/* Identity stage */}
      <div
        ref={heroCenterRef}
        className="relative"
        style={{ minHeight: 'calc(100svh - 8rem)' }}
      >
        <div className="absolute inset-0">

          {/* ── Arunkumar ── */}
          <div
            ref={arunGroupRef}
            className="absolute left-0 top-0"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Colour square */}
            <div
              className="aspect-square"
              style={{ width: SQ, background: 'var(--accent)' }}
            />
            {/* Name block */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-10"
              style={{ left: `calc(${SQ} * 0.5)` }}
            >
              <h1
                className="m-0 font-light leading-[1.08] tracking-[0.03em] text-[rgba(0,0,0,.85)] whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-mackinac), serif',
                  fontSize: 'clamp(3rem, 7vw, 5rem)',
                }}
              >
                Arunkumar<br />Elangovan
              </h1>
              <p
                className="m-0 flex items-center gap-1 whitespace-nowrap text-[rgba(0,0,0,.85)]"
                style={{
                  marginTop: 'clamp(0.55rem, 1.5vw, 1.05rem)',
                  paddingLeft: 'clamp(12.5rem, 18vw, 16rem)',
                  fontFamily: 'var(--font-mackinac), serif',
                  fontSize: 'clamp(1rem, 1.4vw, 1.35rem)',
                  letterSpacing: '0.03em',
                }}
              >
                <span>-</span>
                <span ref={designerTextRef}>Designer</span>
                <button
                  ref={refreshBtnRef}
                  className="ml-1 inline-flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity"
                  style={{ width: '1em', height: '1em', flexShrink: 0 }}
                  aria-label="Change designer title"
                >
                  <img src="/refresh.svg" aria-hidden="true" style={{ width: '1em', height: '1em' }} />
                </button>
              </p>
            </div>
          </div>

          {/* ── MerlinAI Copywriter ── */}
          <div
            ref={merlinGroupRef}
            className="absolute left-0 top-0"
            style={{ willChange: 'transform, opacity', opacity: 0, pointerEvents: 'none' }}
          >
            <Link href="/case-study/Merlin-AI" className="block no-underline text-inherit" style={{ cursor: 'none' }}>
              <div className="aspect-square" style={{ width: SQ, background: '#818cf8' }} />
              <div
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `calc(${SQ} * 0.5)` }}
              >
                <h2
                  className="m-0 font-[500] leading-[1.05] tracking-[0.02em] text-[rgba(0,0,0,.85)] whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-mackinac), serif',
                    fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                  }}
                >
                  MerlinAI Copywriter
                </h2>
                <p className="m-0 mt-1 text-[clamp(0.7rem,1vw,0.85rem)] font-[550] tracking-[0.06em] uppercase text-[var(--muted)]">
                  MoEngage
                </p>
                <p className="m-0 text-[clamp(0.7rem,1vw,0.85rem)] font-[400] text-[var(--muted)]">
                  2023 – 2024
                </p>
              </div>
            </Link>
          </div>

          {/* ── MoEngage Design System ── */}
          <div
            ref={moeGroupRef}
            className="absolute left-0 top-0"
            style={{ willChange: 'transform, opacity', opacity: 0, pointerEvents: 'none', cursor: 'none' }}
          >
            <div className="aspect-square" style={{ width: SQ, background: '#a5b4fc' }} />
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `calc(${SQ} * 0.5)` }}
            >
              <h2
                className="m-0 font-[500] leading-[1.05] tracking-[0.02em] text-[rgba(0,0,0,.85)] whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-mackinac), serif',
                  fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                }}
              >
                MoEngage - Dark mode
              </h2>
              <p className="m-0 mt-1 text-[clamp(0.7rem,1vw,0.85rem)] font-[550] tracking-[0.06em] uppercase text-[var(--muted)]">
                MoEngage
              </p>
              <p className="m-0 text-[clamp(0.7rem,1vw,0.85rem)] font-[400] text-[var(--muted)]">
                2023 – 2024
              </p>
            </div>
          </div>

          {/* ── Video Script Editor / Hippo video ── */}
          <div
            ref={hippoGroupRef}
            className="absolute left-0 top-0"
            style={{ willChange: 'transform, opacity', opacity: 0, pointerEvents: 'none' }}
          >
            <Link href="/case-study/video-script-editor" className="block no-underline text-inherit" style={{ cursor: 'none' }}>
              <div
                className="aspect-square"
                style={{
                  width: SQ,
                  background: 'linear-gradient(180deg, #DBFFD3 0%, #F1C26A 100%)',
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `calc(${SQ} * 0.5)` }}
              >
                <h2
                  className="m-0 font-[500] leading-[1.05] tracking-[0.02em] text-[rgba(0,0,0,.85)] whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-mackinac), serif',
                    fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                  }}
                >
                  Video Script Editor
                </h2>
                <p className="m-0 mt-1 text-[clamp(0.7rem,1vw,0.85rem)] font-[550] tracking-[0.06em] uppercase text-[var(--muted)]">
                  Hippo video
                </p>
                <p className="m-0 text-[clamp(0.7rem,1vw,0.85rem)] font-[400] text-[var(--muted)]">
                  2022 – 2023
                </p>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Edge notes */}
      <footer
        className="absolute flex justify-between items-end pointer-events-none"
        style={{
          inset: `auto clamp(1.1rem, 2.2vw, 2.1rem) clamp(0.8rem, 1.2vw, 1.2rem)`,
        }}
      >
        <p
          ref={factRef}
          className="m-0 text-[var(--muted)] font-[500]"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.76rem)',
            letterSpacing: '0.01em',
            transition: 'opacity 180ms ease, transform 180ms ease',
          }}
        >
          {FACTS[0]}
        </p>
        <div className="text-right">
          <p className="m-0 text-[var(--muted)] font-[500]" style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.76rem)', letterSpacing: '0.01em' }}>
            Version - MK-42
          </p>
          <p className="m-0 text-[var(--muted)] font-[500]" style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.76rem)', letterSpacing: '0.01em' }}>
            Built with{' '}
            <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="link-hover transition-colors pointer-events-auto">Next.js</a>
            {', '}
            <a href="https://agentation.dev/" target="_blank" rel="noopener noreferrer" className="link-hover transition-colors pointer-events-auto">Agentation</a>
            {' & '}
            <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer" className="link-hover transition-colors pointer-events-auto">Claude Code</a>
          </p>
        </div>
      </footer>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 flex flex-col items-center justify-center rounded-full text-background font-[600] tracking-[0.06em] uppercase leading-[1.4]"
        style={{
          width: 72, height: 72,
          left: 0, top: 0,
          fontSize: 9,
          opacity: 0,
          background: 'rgba(0,0,0,.85)',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 150ms ease',
        }}
      >
        <span>View</span>
        <span>Casestudy</span>
      </div>
    </section>
  );
}
