"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import NavBar from "../components/nav-bar";
import Minesweeper, { MinesweeperProvider } from "../components/minesweeper";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CanvasItem {
  id: string;
  type: "image" | "text" | "component";
  x: number;
  y: number;
  rotate: number;
  width: number;
  height: number;
  src?: string;
  text?: string;
  fontSize?: number;
  mono?: boolean;
  component?: string;
}

/* ------------------------------------------------------------------ */
/*  Items                                                              */
/* ------------------------------------------------------------------ */

let nextId = 1;
const id = () => `item-${nextId++}`;

const ITEMS: CanvasItem[] = [
  { id: id(), type: "image", x: 395, y: -413, rotate: 3.2, width: 280, height: 160, src: "/images/play/vision.jpg" },
  { id: id(), type: "image", x: 154, y: -489, rotate: -2, width: 300, height: 300, src: "/images/play/map.png" },
  { id: id(), type: "image", x: 261, y: -264, rotate: -7, width: 300, height: 220, src: "/images/play/garden.png" },
  { id: id(), type: "text", x: 478, y: -452, rotate: -0.5, width: 160, height: 18, text: "amateur landscape designer", fontSize: 11, mono: true },
  { id: id(), type: "text", x: 144, y: -86, rotate: 0, width: 200, height: 20, text: "all native, full shade", fontSize: 12 },
  { id: id(), type: "image", x: 687, y: 89, rotate: 0, width: 320, height: 211, src: "/images/play/caster.png" },
  { id: id(), type: "text", x: 691, y: 304, rotate: 0, width: 200, height: 18, text: "Caster", fontSize: 13 },
  { id: id(), type: "text", x: 694, y: 323, rotate: 0, width: 200, height: 18, text: "vibe coded 3D shadow casting tool", fontSize: 11, mono: true },
  { id: id(), type: "image", x: 928, y: -362, rotate: 0, width: 320, height: 211, src: "/images/play/coldornah.png" },
  { id: id(), type: "text", x: 925, y: -140, rotate: 0, width: 200, height: 18, text: "Is it cold or nah?", fontSize: 13 },
  { id: id(), type: "text", x: 925, y: -116, rotate: 0, width: 260, height: 18, text: "Maine water temperature tracker", fontSize: 11, mono: true },
  { id: id(), type: "text", x: 1053, y: -467, rotate: 4.5, width: 200, height: 20, text: "occasionally buggy", fontSize: 12 },
  { id: id(), type: "image", x: 1352, y: -297, rotate: 3, width: 262, height: 312, src: "/images/play/servee.png" },
  { id: id(), type: "image", x: -460, y: 427, rotate: 0, width: 300, height: 297, src: "/images/play/autofill.png" },
  { id: id(), type: "image", x: 178, y: 120, rotate: 0, width: 278, height: 300, src: "/images/play/address.png" },
  { id: id(), type: "image", x: 73, y: 553, rotate: 5, width: 300, height: 235, src: "/images/play/tracker.png" },
  { id: id(), type: "image", x: -132, y: 851, rotate: -2.5, width: 180, height: 338, src: "/images/play/mobile.png" },
  { id: id(), type: "image", x: -609, y: 838, rotate: 0, width: 300, height: 198, src: "/images/play/doc.png" },
  { id: id(), type: "image", x: -234, y: -62, rotate: -1, width: 240, height: 384, src: "/images/play/merck.png" },
  { id: id(), type: "image", x: 926, y: 516, rotate: 0, width: 300, height: 172, src: "/images/play/meets.png" },
  { id: id(), type: "image", x: 767, y: 675, rotate: 0, width: 300, height: 172, src: "/images/play/qbr.png" },
  { id: id(), type: "text", x: 790, y: 630, rotate: -6, width: 200, height: 20, text: "my favorite PMs", fontSize: 12 },
  { id: id(), type: "text", x: 1039, y: 470, rotate: 6.5, width: 200, height: 20, text: "personality hire \u{1F61C}", fontSize: 12 },
  { id: id(), type: "image", x: 526, y: 794, rotate: 0, width: 300, height: 172, src: "/images/play/brand.png" },
  { id: id(), type: "text", x: 617, y: 994, rotate: -5.5, width: 200, height: 20, text: "Land & Brand with Unfold", fontSize: 12 },
  { id: id(), type: "image", x: 1471, y: 350, rotate: -3, width: 148, height: 300, src: "/images/play/theorem.png" },
  { id: id(), type: "image", x: -1004, y: -411, rotate: -6.5, width: 165, height: 240, src: "/images/play/nails1.png" },
  { id: id(), type: "image", x: -865, y: -606, rotate: 5.5, width: 165, height: 240, src: "/images/play/nails2.png" },
  { id: id(), type: "image", x: -719, y: -593, rotate: -4.5, width: 185, height: 260, src: "/images/play/nails3.png" },
  { id: id(), type: "image", x: -664, y: -404, rotate: 7.5, width: 165, height: 240, src: "/images/play/nails4.png" },
  { id: id(), type: "image", x: -843, y: -413, rotate: -7.5, width: 205, height: 280, src: "/images/play/nails5.png" },
  { id: id(), type: "text", x: -722, y: -121, rotate: -4, width: 200, height: 20, text: "been doing nail art for 5 years", fontSize: 12 },
  { id: id(), type: "image", x: -1027, y: 484, rotate: -9, width: 300, height: 151, src: "/images/play/Check.png" },
  { id: id(), type: "image", x: -13, y: -522, rotate: 0, width: 82, height: 241, src: "/images/play/11.png" },
  { id: id(), type: "image", x: 995, y: 1032, rotate: -2.5, width: 100, height: 98, src: "/images/play/36.png" },
  { id: id(), type: "image", x: 577, y: 508, rotate: 5.5, width: 80, height: 70, src: "/images/play/100.png" },
  { id: id(), type: "image", x: -330, y: -208, rotate: 0, width: 120, height: 81, src: "/images/play/110.png" },
  { id: id(), type: "image", x: -645, y: -574, rotate: 0, width: 80, height: 34, src: "/images/play/12.png" },
  { id: id(), type: "image", x: -990, y: -397, rotate: 0, width: 80, height: 30, src: "/images/play/3.png" },
  { id: id(), type: "image", x: -819, y: -401, rotate: 0, width: 80, height: 25, src: "/images/play/9.png" },
  { id: id(), type: "image", x: -780, y: -609, rotate: 15, width: 60, height: 47, src: "/images/play/92.png" },
  { id: id(), type: "image", x: -587, y: -423, rotate: 15, width: 80, height: 62, src: "/images/play/94.png" },
  { id: id(), type: "image", x: -798, y: 199, rotate: 0, width: 200, height: 115, src: "/images/play/Scribble-Block-19.png" },
  { id: id(), type: "image", x: 209, y: -37, rotate: 13, width: 100, height: 38, src: "/images/play/Arrow-19.png" },
  { id: id(), type: "image", x: 1108, y: -427, rotate: 62, width: 80, height: 34, src: "/images/play/Arrow-38.png" },
  { id: id(), type: "image", x: -482, y: 401, rotate: 0, width: 113, height: 116, src: "/images/play/Angle-29.png" },
  { id: id(), type: "image", x: -1027, y: 845, rotate: 4, width: 220, height: 150, src: "/images/play/HandwrittenNotes-12.png" },
  { id: id(), type: "image", x: 167, y: 95, rotate: 0, width: 300, height: 16, src: "/images/play/Line-Ornamental-03.png" },
  { id: id(), type: "image", x: -645, y: 1075, rotate: 0, width: 220, height: 13, src: "/images/play/Line-Scribble-21.png" },
  { id: id(), type: "image", x: 1174, y: 95, rotate: 4.5, width: 200, height: 195, src: "/images/play/Box-28.png" },
  { id: id(), type: "image", x: 1098, y: 719, rotate: 15, width: 50, height: 66, src: "/images/play/Heart-07.png" },
  { id: id(), type: "image", x: 583, y: -216, rotate: 0, width: 80, height: 78, src: "/images/play/Flower-05.png" },
  { id: id(), type: "image", x: -992, y: 586, rotate: -9.5, width: 300, height: 75, src: "/images/play/Angle-18.png" },
  { id: id(), type: "image", x: 636, y: 55, rotate: 0, width: 180, height: 65, src: "/images/play/Cloud-04.png" },
  { id: id(), type: "image", x: -734, y: 65, rotate: 4, width: 320, height: 211, src: "/images/play/userwise.png" },
  { id: id(), type: "image", x: -1255, y: -894, rotate: -9.5, width: 300, height: 176, src: "/images/play/confidence.png" },
  { id: id(), type: "image", x: -1092, y: -794, rotate: -0.5, width: 300, height: 176, src: "/images/play/deg.png" },
  { id: id(), type: "image", x: 1318, y: 862, rotate: 4, width: 300, height: 285, src: "/images/play/tasks.png" },
  { id: id(), type: "image", x: 728, y: -791, rotate: 1.5, width: 230, height: 329, src: "/images/play/before.png" },
  { id: id(), type: "image", x: 1346, y: -756, rotate: 13.5, width: 62, height: 300, src: "/images/play/76.png" },
  { id: id(), type: "image", x: 909, y: -847, rotate: 7.5, width: 60, height: 48, src: "/images/play/128.png" },
  { id: id(), type: "image", x: -396, y: -811, rotate: -6.5, width: 288, height: 300, src: "/images/play/speed.png" },
  { id: id(), type: "image", x: -134, y: -575, rotate: 0, width: 69, height: 109, src: "/images/play/Star-06.png" },
  { id: id(), type: "text", x: 640, y: -809, rotate: -5.5, width: 200, height: 20, text: "this is what proof looked like", fontSize: 12 },
  { id: id(), type: "text", x: 645, y: -786, rotate: -5.5, width: 200, height: 20, text: " before I got there", fontSize: 12 },
  { id: id(), type: "image", x: 271, y: 827, rotate: -15, width: 80, height: 45, src: "/images/play/Arrow-47.png" },
  { id: id(), type: "text", x: 102, y: 813, rotate: -1.5, width: 200, height: 20, text: "this bad boy has over 50 variations", fontSize: 12 },
  { id: id(), type: "component", x: -1206, y: -91, rotate: 2.5, width: 242, height: 320, component: "minesweeper" },
  { id: id(), type: "image", x: 178, y: -901, rotate: 3, width: 291, height: 300, src: "/images/play/mail.png" },
  { id: id(), type: "image", x: 262, y: 1075, rotate: 0, width: 260, height: 54, src: "/images/play/Line-Ornamental-22.png" },
  { id: id(), type: "image", x: -1185, y: -504, rotate: 0, width: 59, height: 69, src: "/images/play/Smiley-18.png" },
  { id: id(), type: "text", x: -1175, y: 232, rotate: -4.5, width: 200, height: 20, text: "play some minesweeper!", fontSize: 12 },
];

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Each line is a layer of motion.
 *
 *    0ms   page mounts — all items invisible
 *  0–600ms items fade in + scale up (staggered by seed)
 *  600ms+  breathing loop begins — gentle vertical bob
 *  hover   item tilts ±2–4° in seeded direction
 *  pan/scroll  (optional parallax removed for lighter feel)
 * ───────────────────────────────────────────────────────── */

/* entrance — fade + scale from 95% */
const ENTER = {
  duration:     0.8,     // seconds
  maxStagger:   0.6,     // seconds, spread across all items
  initialScale: 0.95,    // scale before appearing
};

/* breathing — subtle vertical float */
const BREATHE = {
  minDuration:  4,       // seconds (slowest item)
  maxDuration:  7,       // seconds (fastest item)
  minAmplitude: 3,       // px (smallest bob)
  maxAmplitude: 6,       // px (largest bob)
};

/* hover — rotation nudge */
const HOVER = {
  minDeg:       1.5,     // minimum rotation nudge
  maxDeg:       3.5,     // maximum rotation nudge
};

function seededRandom(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  return (((h >>> 0) % 1000) / 1000);
}

function itemAnimVars(item: CanvasItem) {
  const seed = seededRandom(item.id);
  const dur = BREATHE.minDuration + seed * (BREATHE.maxDuration - BREATHE.minDuration);
  const amp = BREATHE.minAmplitude + seed * (BREATHE.maxAmplitude - BREATHE.minAmplitude);
  const nudge = HOVER.minDeg + seed * (HOVER.maxDeg - HOVER.minDeg);

  return {
    "--base-rotate":  `${item.rotate}deg`,
    "--breathe-dur":  `${dur}s`,
    "--breathe-delay": `${-(seed * dur)}s`,
    "--breathe-y":    `${amp}px`,
    "--hover-nudge":  `${seed > 0.5 ? nudge : -nudge}deg`,
    "--enter-delay":  `${seed * ENTER.maxStagger}s`,
  } as React.CSSProperties;
}

/* ------------------------------------------------------------------ */
/*  Tile bounds                                                        */
/* ------------------------------------------------------------------ */

const TILE_PAD = 20;

/**
 * How far around the pan center we mount tiles (px, virtual). Not tied to `window` so SSR
 * and the client agree on which cells exist — avoids hydration jump.
 */
const PLAY_TILE_RING_W = 4096;
const PLAY_TILE_RING_H = 2400;

/** Desktop: repeat the collage this many tiles left/right and up/down from origin (world is 2r+1 per axis). */
const PLAY_FULL_TILE_RADIUS = 4;

/** Below this width, mount one tile only (avoids iOS Safari OOM / “A problem repeatedly occurred”). */
const PLAY_MOBILE_MQ = "(max-width: 767px)";

/**
 * Compact-only: canvas `transform: scale(...)` (see wrapper below). Pan math divides by this so dragging
 * stays 1:1 on screen. Edit **only this number** — no separate CSS scale to keep in sync.
 */
const PLAY_COMPACT_CANVAS_SCALE = 0.9;

/** Compact: always one canonical tile at origin — pan is only the outer translate. Updating col/row on grid crossings jumped the inner layer by ±tile.w and caused iOS to clip/vanish layers after long pans. */
const PLAY_COMPACT_TILES: { col: number; row: number }[] = [{ col: 0, row: 0 }];

type TileMetrics = {
  w: number;
  h: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

function computeTile(items: CanvasItem[]): TileMetrics {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const it of items) {
    minX = Math.min(minX, it.x);
    minY = Math.min(minY, it.y);
    maxX = Math.max(maxX, it.x + it.width);
    maxY = Math.max(maxY, it.y + it.height);
  }
  return {
    w: maxX - minX + TILE_PAD * 2,
    h: maxY - minY + TILE_PAD * 2,
    minX,
    minY,
    maxX,
    maxY,
  };
}

type PanBounds = { minCol: number; maxCol: number; minRow: number; maxRow: number };

function panBoundsForLayout(layout: "pending" | "compact" | "full"): PanBounds | null {
  if (layout === "pending") return null;
  if (layout === "compact") {
    return { minCol: 0, maxCol: 0, minRow: 0, maxRow: 0 };
  }
  const r = PLAY_FULL_TILE_RADIUS;
  return { minCol: -r, maxCol: r, minRow: -r, maxRow: r };
}

/**
 * Pan layer origin sits at viewport center; translate (tx, ty) moves the world.
 * Clamp using real collage bounds (items use negative x/y — grid cell [0,tw] is not the content box).
 * Use layout viewport size so coords match `fixed inset-0` + pointer `clientX/Y`.
 */
function layoutViewportSize(): { vw: number; vh: number } {
  if (typeof window === "undefined") return { vw: 1024, vh: 768 };
  return {
    vw: Math.max(1, window.innerWidth),
    vh: Math.max(1, window.innerHeight),
  };
}

function clampPanToWorld(
  x: number,
  y: number,
  vw: number,
  vh: number,
  tile: Pick<TileMetrics, "w" | "h" | "minX" | "minY" | "maxX" | "maxY">,
  b: PanBounds,
): { x: number; y: number } {
  const { w: tw, h: th, minX, minY, maxX, maxY } = tile;
  const worldMinX = b.minCol * tw + minX;
  const worldMaxX = b.maxCol * tw + maxX;
  const worldMinY = b.minRow * th + minY;
  const worldMaxY = b.maxRow * th + maxY;
  const txMin = vw / 2 - worldMaxX;
  const txMax = -vw / 2 - worldMinX;
  const xLo = Math.min(txMin, txMax);
  const xHi = Math.max(txMin, txMax);
  const tyMin = vh / 2 - worldMaxY;
  const tyMax = -vh / 2 - worldMinY;
  const yLo = Math.min(tyMin, tyMax);
  const yHi = Math.max(tyMin, tyMax);
  return {
    x: Math.min(xHi, Math.max(xLo, x)),
    y: Math.min(yHi, Math.max(yLo, y)),
  };
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

const INITIAL_OFFSET = { x: -450, y: 100 };

export default function PlayPage() {
  const tile = useMemo(() => computeTile(ITEMS), []);

  const [playLayout, setPlayLayout] = useState<"pending" | "compact" | "full">("pending");

  useLayoutEffect(() => {
    const mq = window.matchMedia(PLAY_MOBILE_MQ);
    const apply = () => setPlayLayout(mq.matches ? "compact" : "full");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const playLayoutRef = useRef(playLayout);
  playLayoutRef.current = playLayout;

  const [offset, setOffset] = useState(INITIAL_OFFSET);
  const offsetRef = useRef(INITIAL_OFFSET);
  const panLayerRef = useRef<HTMLDivElement>(null);
  /** Tile grid center; only when this changes do we need a React re-render. */
  const tileCenterRef = useRef({
    col: Math.floor(-INITIAL_OFFSET.x / tile.w),
    row: Math.floor(-INITIAL_OFFSET.y / tile.h),
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const panning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOffsetStart = useRef({ x: 0, y: 0 });

  const velocity = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const rafId = useRef<number>(0);
  const glidingRef = useRef(false);
  const wheelAccRef = useRef({ x: 0, y: 0 });
  const wheelRafRef = useRef<number>(0);
  const wheelIdleTimerRef = useRef(0 as number | undefined);

  /** Pan transform via ref so pointermove doesn’t re-render the whole canvas every event. */
  const applyPan = useCallback(
    (x: number, y: number) => {
      const b = panBoundsForLayout(playLayoutRef.current);
      let nx = x;
      let ny = y;
      if (b && typeof window !== "undefined") {
        const { vw, vh } = layoutViewportSize();
        const expand =
          playLayoutRef.current === "compact" ? 1 / PLAY_COMPACT_CANVAS_SCALE : 1;
        const c = clampPanToWorld(x, y, vw * expand, vh * expand, tile, b);
        nx = c.x;
        ny = c.y;
      }
      offsetRef.current = { x: nx, y: ny };
      const el = panLayerRef.current;
      if (el) el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;

      const col = Math.floor(-nx / tile.w);
      const row = Math.floor(-ny / tile.h);
      const tc = tileCenterRef.current;
      if (col !== tc.col || row !== tc.row) {
        tileCenterRef.current = { col, row };
        /* Compact: never update offset — tile stays at (0,0); only ref pan moves (avoids inner translate jumps / iOS layer bugs). */
        if (playLayoutRef.current !== "compact") {
          startTransition(() => setOffset({ x: nx, y: ny }));
        }
      }
    },
    [tile],
  );

  /* Compact: sync pan from ref when entering compact (offset state is not updated while panning on compact). */
  useLayoutEffect(() => {
    if (playLayout !== "compact") return;
    const el = panLayerRef.current;
    if (!el) return;
    const { x, y } = offsetRef.current;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, [playLayout]);

  const prevPlayLayoutRef = useRef(playLayout);
  /* Leaving compact: full layout reads pan from React `offset` — flush ref so we don’t snap to stale state. */
  useLayoutEffect(() => {
    const prev = prevPlayLayoutRef.current;
    prevPlayLayoutRef.current = playLayout;
    if (prev !== "compact" || playLayout !== "full") return;
    const { x, y } = offsetRef.current;
    setOffset({ x, y });
    tileCenterRef.current = {
      col: Math.floor(-x / tile.w),
      row: Math.floor(-y / tile.h),
    };
  }, [playLayout, tile.w, tile.h]);

  /**
   * Don’t put `transform` on the pan layer’s React `style` object: any re-render would apply
   * stale `offset` state and overwrite the live transform from `applyPan`, snapping the
   * canvas (and e.g. hiding Minesweeper off-screen). Sync from offsetRef whenever the node mounts.
   */
  const setPanLayerRef = useCallback((el: HTMLDivElement | null) => {
    panLayerRef.current = el;
    if (el) {
      const { x, y } = offsetRef.current;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, []);

  const tiles = useMemo(() => {
    if (playLayout === "pending") return [];

    if (playLayout === "compact") {
      return PLAY_COMPACT_TILES;
    }

    const bounds = panBoundsForLayout("full")!;
    const centerCol = Math.floor(-offset.x / tile.w);
    const centerRow = Math.floor(-offset.y / tile.h);

    const countX = Math.ceil(PLAY_TILE_RING_W / tile.w) + 2;
    const countY = Math.ceil(PLAY_TILE_RING_H / tile.h) + 2;
    const halfX = Math.ceil(countX / 2);
    const halfY = Math.ceil(countY / 2);

    const result: { col: number; row: number }[] = [];
    for (let row = centerRow - halfY; row <= centerRow + halfY; row++) {
      for (let col = centerCol - halfX; col <= centerCol + halfX; col++) {
        if (col < bounds.minCol || col > bounds.maxCol || row < bounds.minRow || row > bounds.maxRow) {
          continue;
        }
        result.push({ col, row });
      }
    }
    return result;
  }, [offset.x, offset.y, tile, playLayout]);

  /* ---- pointer drag to pan ---- */
  const setCanvasMoving = useCallback((on: boolean) => {
    const el = containerRef.current;
    if (!el) return;
    el.classList.toggle("play-canvas-moving", on);
  }, []);

  const scheduleWheelIdleClear = useCallback(() => {
    if (wheelIdleTimerRef.current !== undefined) {
      window.clearTimeout(wheelIdleTimerRef.current);
    }
    wheelIdleTimerRef.current = window.setTimeout(() => {
      if (!panning.current && !glidingRef.current) setCanvasMoving(false);
    }, 100);
  }, [setCanvasMoving]);

  const flushWheelAccum = useCallback(() => {
    const acc = wheelAccRef.current;
    wheelRafRef.current = 0;
    if (acc.x === 0 && acc.y === 0) return;
    wheelAccRef.current = { x: 0, y: 0 };
    const inv =
      playLayoutRef.current === "compact" ? 1 / PLAY_COMPACT_CANVAS_SCALE : 1;
    applyPan(offsetRef.current.x - acc.x * inv, offsetRef.current.y - acc.y * inv);
  }, [applyPan]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    panning.current = true;
    setCanvasMoving(true);
    if (wheelIdleTimerRef.current !== undefined) {
      window.clearTimeout(wheelIdleTimerRef.current);
    }
    panStart.current = { x: e.clientX, y: e.clientY };
    panOffsetStart.current = { ...offsetRef.current };
    lastPointer.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    velocity.current = { x: 0, y: 0 };
    cancelAnimationFrame(rafId.current);
    glidingRef.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
  }, [setCanvasMoving]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!panning.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    const inv =
      playLayoutRef.current === "compact" ? 1 / PLAY_COMPACT_CANVAS_SCALE : 1;
    const next = {
      x: panOffsetStart.current.x + dx * inv,
      y: panOffsetStart.current.y + dy * inv,
    };
    const now = Date.now();
    const dt = Math.max(1, now - lastPointer.current.t);
    velocity.current = {
      x: (e.clientX - lastPointer.current.x) / dt,
      y: (e.clientY - lastPointer.current.y) / dt,
    };
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    /* 1:1 pan only — lag spring during drag fought the pointer and felt rubbery. */
    applyPan(next.x, next.y);
  }, [applyPan]);

  const onPointerUp = useCallback(() => {
    if (!panning.current) return;
    panning.current = false;
    if (containerRef.current) containerRef.current.style.cursor = "grab";
    /* px/ms → px/s for time-based glide (compact: screen velocity → inner pan space) */
    const inv =
      playLayoutRef.current === "compact" ? 1 / PLAY_COMPACT_CANVAS_SCALE : 1;
    let vx = velocity.current.x * 1000 * inv;
    let vy = velocity.current.y * 1000 * inv;
    let lastT = performance.now();
    const low = Math.abs(vx) < 8 && Math.abs(vy) < 8;
    if (low) {
      glidingRef.current = false;
      setCanvasMoving(false);
      return;
    }
    glidingRef.current = true;
    const glide = (t: number) => {
      const dt = Math.min(48, t - lastT) / 1000;
      lastT = t;
      const decay = Math.exp(-10 * dt);
      vx *= decay;
      vy *= decay;
      if (Math.abs(vx) < 8 && Math.abs(vy) < 8) {
        glidingRef.current = false;
        setCanvasMoving(false);
        return;
      }
      const nx = offsetRef.current.x + vx * dt;
      const ny = offsetRef.current.y + vy * dt;
      applyPan(nx, ny);
      rafId.current = requestAnimationFrame(glide);
    };
    rafId.current = requestAnimationFrame(glide);
  }, [applyPan, setCanvasMoving]);

  useEffect(
    () => () => {
      cancelAnimationFrame(rafId.current);
      cancelAnimationFrame(wheelRafRef.current);
      if (wheelIdleTimerRef.current !== undefined) {
        window.clearTimeout(wheelIdleTimerRef.current);
      }
    },
    [],
  );

  /* Keep pan inside bounds when the layout viewport size changes. */
  useEffect(() => {
    if (playLayout === "pending") return;

    const reclamp = () => {
      const { x, y } = offsetRef.current;
      applyPan(x, y);
    };
    window.addEventListener("resize", reclamp);
    return () => window.removeEventListener("resize", reclamp);
  }, [playLayout, applyPan]);

  /* iOS Safari: block non-standard pinch gestures so they don’t fight custom pan. */
  useEffect(() => {
    if (playLayout !== "compact") return;
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", block, { passive: false });
    document.addEventListener("gesturechange", block, { passive: false });
    document.addEventListener("gestureend", block, { passive: false });
    return () => {
      document.removeEventListener("gesturestart", block);
      document.removeEventListener("gesturechange", block);
      document.removeEventListener("gestureend", block);
    };
  }, [playLayout]);

  /* ---- scroll to pan (coalesced per frame — no lag spring; it fought scroll) ---- */
  useEffect(() => {
    if (playLayout === "pending") return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCanvasMoving(true);
      if (wheelIdleTimerRef.current !== undefined) {
        window.clearTimeout(wheelIdleTimerRef.current);
      }
      wheelAccRef.current.x += e.deltaX;
      wheelAccRef.current.y += e.deltaY;
      if (!wheelRafRef.current) {
        wheelRafRef.current = requestAnimationFrame(flushWheelAccum);
      }
      scheduleWheelIdleClear();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [playLayout, flushWheelAccum, scheduleWheelIdleClear, setCanvasMoving]);

  /* Static media tiles; interactive components tile the same way so they repeat on the infinite canvas. */
  const staticItems = ITEMS.filter(i => i.type !== "component");
  const componentItems = ITEMS.filter(i => i.type === "component");

  /* ---- render a single tile ---- */
  const renderTile = (dx: number, dy: number) => (
    <div className="absolute pointer-events-none" style={{ transform: `translate3d(${dx}px, ${dy}px, 0)` }}>
      {staticItems.map((item) => {
        const vars = itemAnimVars(item);

        if (item.type === "image") {
          return (
            <div
              key={item.id}
              className="absolute play-item"
              style={{ left: item.x, top: item.y, width: item.width, height: item.height, ...vars }}
            >
              {item.src && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  loading={playLayout === "compact" ? "eager" : "lazy"}
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              )}
            </div>
          );
        }

        return (
          <div
            key={item.id}
            className="absolute play-item"
            style={{ left: item.x, top: item.y, minWidth: 40, ...vars }}
          >
            <span style={{
              fontSize: item.fontSize || 12,
              fontFamily: item.mono ? "var(--font-geist-mono), monospace" : "inherit",
              color: "var(--muted)",
              whiteSpace: "nowrap",
            }}>
              {item.text}
            </span>
          </div>
        );
      })}
      {componentItems.map((item) => {
        const vars = itemAnimVars(item);
        /* Compact: stable key so Minesweeper doesn’t remount when tile cell dx/dy updates. */
        const compKey = playLayout === "compact" ? item.id : `${item.id}@${dx},${dy}`;
        return (
          <div
            key={compKey}
            className="absolute play-item"
            style={{ left: item.x, top: item.y, zIndex: 2, ...vars }}
          >
            {item.component === "minesweeper" && <Minesweeper />}
          </div>
        );
      })}
    </div>
  );

  if (playLayout === "pending") {
    return (
      <>
        <NavBar showBack />
        <div
          className="fixed inset-0 bg-[var(--background)]"
          aria-busy="true"
          aria-label="Loading play canvas"
        />
      </>
    );
  }

  return (
    <MinesweeperProvider>
      <NavBar showBack />

      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="play-canvas-root fixed inset-0 overflow-hidden select-none"
        style={{
          cursor: "grab",
          touchAction: "none",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
        }}
      >
        {/* Mobile: scale only this subtree (nav is outside). Scale comes from PLAY_COMPACT_CANVAS_SCALE only. */}
        <div
          className="absolute inset-0"
          style={
            playLayout === "compact"
              ? {
                  transform: `scale(${PLAY_COMPACT_CANVAS_SCALE})`,
                  transformOrigin: "center center",
                  pointerEvents: "none",
                }
              : undefined
          }
        >
          {/* dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* panning layer — pointer-events-none so hover reaches items */}
          <div
            ref={setPanLayerRef}
            className={
              playLayout === "compact"
                ? "absolute pointer-events-none"
                : "absolute will-change-transform pointer-events-none"
            }
            style={{
              /* Full layout: transform in React avoids first-paint snap. Compact: ref-only + useLayoutEffect — avoids iOS flicker when state lags ref during pan. */
              ...(playLayout === "full"
                ? { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }
                : {}),
              transformOrigin: "0 0",
              left: "50%",
              top: "50%",
              backfaceVisibility: "hidden",
            }}
          >
            {tiles.map((t) => (
              <div
                key={playLayout === "compact" ? "play-compact-tile" : `${t.col},${t.row}`}
                className="pointer-events-none"
              >
                {renderTile(t.col * tile.w, t.row * tile.h)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MinesweeperProvider>
  );
}
