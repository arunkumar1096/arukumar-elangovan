"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Config                                                              */
/* ------------------------------------------------------------------ */

const ROWS = 9;
const COLS = 9;
const MINES = 10;
const CELL = 24; // px per cell

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

type GameState = "idle" | "playing" | "won" | "lost";

/* ------------------------------------------------------------------ */
/*  Win98 palette                                                       */
/* ------------------------------------------------------------------ */

const C = {
  surface:   "#c0c0c0",
  highlight: "#ffffff",
  light:     "#dfdfdf",
  shadow:    "#808080",
  frame:     "#0a0a0a",
  titleBar:  "#000080",
  titleEnd:  "#1084d0",
  ledBg:     "#000000",
  ledOn:     "#ff0000",
  ledOff:    "#300000",
};

/* box-shadow helpers */
const raised = `inset -1px -1px ${C.frame}, inset 1px 1px ${C.highlight}, inset -2px -2px ${C.shadow}, inset 2px 2px ${C.light}`;
const sunken = `inset -1px -1px ${C.highlight}, inset 1px 1px ${C.frame}, inset -2px -2px ${C.light}, inset 2px 2px ${C.shadow}`;
const windowFrame = `inset -1px -1px ${C.frame}, inset 1px 1px ${C.light}, inset -2px -2px ${C.shadow}, inset 2px 2px ${C.highlight}`;

/* number colors */
const NUM_COLORS: Record<number, string> = {
  1: "#0000FF",
  2: "#008000",
  3: "#FF0000",
  4: "#000080",
  5: "#800000",
  6: "#008080",
  7: "#000000",
  8: "#808080",
};

/* ------------------------------------------------------------------ */
/*  Board logic                                                         */
/* ------------------------------------------------------------------ */

function createBoard(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    }))
  );
}

function placeMines(board: Cell[][], mines: number, safeR: number, safeC: number) {
  const rows = board.length;
  const cols = board[0].length;
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (board[r][c].mine) continue;
    if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
    board[r][c].mine = true;
    placed++;
  }
  // compute adjacency
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine) count++;
        }
      }
      board[r][c].adjacent = count;
    }
  }
}

function reveal(board: Cell[][], r: number, c: number) {
  const rows = board.length;
  const cols = board[0].length;
  if (r < 0 || r >= rows || c < 0 || c >= cols) return;
  const cell = board[r][c];
  if (cell.revealed || cell.flagged) return;
  cell.revealed = true;
  if (cell.adjacent === 0 && !cell.mine) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        reveal(board, r + dr, c + dc);
      }
    }
  }
}

function checkWin(board: Cell[][]): boolean {
  for (const row of board) {
    for (const cell of row) {
      if (!cell.mine && !cell.revealed) return false;
    }
  }
  return true;
}

function cloneBoard(board: Cell[][]): Cell[][] {
  return board.map(row => row.map(cell => ({ ...cell })));
}

/* ------------------------------------------------------------------ */
/*  Seven-segment digit (pure CSS)                                      */
/* ------------------------------------------------------------------ */

const SEGMENTS: Record<string, boolean[]> = {
  "0": [true,  true,  true,  true,  true,  true,  false],
  "1": [false, true,  true,  false, false, false, false],
  "2": [true,  true,  false, true,  true,  false, true],
  "3": [true,  true,  true,  true,  false, false, true],
  "4": [false, true,  true,  false, false, true,  true],
  "5": [true,  false, true,  true,  false, true,  true],
  "6": [true,  false, true,  true,  true,  true,  true],
  "7": [true,  true,  true,  false, false, false, false],
  "8": [true,  true,  true,  true,  true,  true,  true],
  "9": [true,  true,  true,  true,  false, true,  true],
  "-": [false, false, false, false, false, false, true],
};

/* segments: 0=top, 1=topRight, 2=bottomRight, 3=bottom, 4=bottomLeft, 5=topLeft, 6=middle */
function Digit({ char }: { char: string }) {
  const segs = SEGMENTS[char] || SEGMENTS["0"];
  const w = 13, h = 23;
  const t = 2; // segment thickness

  const segStyle = (on: boolean): CSSProperties => ({
    position: "absolute",
    background: on ? C.ledOn : C.ledOff,
    transition: "none",
  });

  return (
    <div style={{ position: "relative", width: w, height: h }}>
      {/* top */}
      <div style={{ ...segStyle(segs[0]), top: 0, left: 2, width: w - 4, height: t }} />
      {/* top-right */}
      <div style={{ ...segStyle(segs[1]), top: 2, right: 0, width: t, height: h / 2 - 3 }} />
      {/* bottom-right */}
      <div style={{ ...segStyle(segs[2]), top: h / 2 + 1, right: 0, width: t, height: h / 2 - 3 }} />
      {/* bottom */}
      <div style={{ ...segStyle(segs[3]), bottom: 0, left: 2, width: w - 4, height: t }} />
      {/* bottom-left */}
      <div style={{ ...segStyle(segs[4]), top: h / 2 + 1, left: 0, width: t, height: h / 2 - 3 }} />
      {/* top-left */}
      <div style={{ ...segStyle(segs[5]), top: 2, left: 0, width: t, height: h / 2 - 3 }} />
      {/* middle */}
      <div style={{ ...segStyle(segs[6]), top: h / 2 - 1, left: 2, width: w - 4, height: t }} />
    </div>
  );
}

function LedDisplay({ value }: { value: number }) {
  const clamped = Math.max(-99, Math.min(999, value));
  const str = clamped < 0
    ? "-" + String(Math.abs(clamped)).padStart(2, "0")
    : String(clamped).padStart(3, "0");

  return (
    <div style={{
      display: "flex",
      gap: 2,
      background: C.ledBg,
      padding: "3px 4px",
      boxShadow: sunken,
    }}>
      {str.split("").map((ch, i) => <Digit key={i} char={ch} />)}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Smiley button                                                       */
/* ------------------------------------------------------------------ */

function SmileyFace({ state, pressing }: { state: GameState; pressing: boolean }) {
  let face: string;
  if (state === "won") face = "\u{1F60E}";
  else if (state === "lost") face = "\u{1F635}";
  else if (pressing) face = "\u{1F62E}";
  else face = "\u{1F642}";

  return (
    <span style={{ fontSize: 18, lineHeight: "24px", userSelect: "none" }}>
      {face}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared game context (one board for every tiled instance)          */
/* ------------------------------------------------------------------ */

type MinesweeperContextValue = {
  board: Cell[][];
  gameState: GameState;
  time: number;
  pressing: boolean;
  minesRemaining: number;
  reset: () => void;
  handleClick: (r: number, c: number) => void;
  handleRightClick: (e: MouseEvent, r: number, c: number) => void;
  handleChord: (r: number, c: number) => void;
  onGridMouseDown: () => void;
  onGridMouseUp: () => void;
};

const MinesweeperContext = createContext<MinesweeperContextValue | null>(null);

function useMinesweeperContext() {
  const v = useContext(MinesweeperContext);
  if (!v) throw new Error("Minesweeper must be used within MinesweeperProvider");
  return v;
}

export function MinesweeperProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState(() => createBoard(ROWS, COLS));
  const [gameState, setGameState] = useState<GameState>("idle");
  const [time, setTime] = useState(0);
  const [pressing, setPressing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const minesPlaced = useRef(false);

  const flagCount = board.flat().filter(c => c.flagged).length;
  const minesRemaining = MINES - flagCount;

  /* timer */
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => setTime(t => Math.min(t + 1, 999)), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState]);

  /* reset */
  const reset = useCallback(() => {
    setBoard(createBoard(ROWS, COLS));
    setGameState("idle");
    setTime(0);
    minesPlaced.current = false;
  }, []);

  /* left click */
  const handleClick = useCallback((r: number, c: number) => {
    if (gameState === "won" || gameState === "lost") return;

    const next = cloneBoard(board);
    const cell = next[r][c];
    if (cell.revealed || cell.flagged) return;

    // first click — place mines
    if (!minesPlaced.current) {
      placeMines(next, MINES, r, c);
      minesPlaced.current = true;
      setGameState("playing");
    }

    if (cell.mine) {
      for (const row of next) for (const cl of row) if (cl.mine) cl.revealed = true;
      setBoard(next);
      setGameState("lost");
      return;
    }

    reveal(next, r, c);
    setBoard(next);

    if (checkWin(next)) {
      setGameState("won");
    }
  }, [gameState, board]);

  /* right click — flag */
  const handleRightClick = useCallback((e: MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState === "won" || gameState === "lost") return;

    const next = cloneBoard(board);
    const cell = next[r][c];
    if (cell.revealed) return;
    cell.flagged = !cell.flagged;
    setBoard(next);
  }, [gameState, board]);

  /* chord click (middle/both buttons) — reveal neighbors if flags match */
  const handleChord = useCallback((r: number, c: number) => {
    if (gameState !== "playing") return;

    const cell = board[r][c];
    if (!cell.revealed || cell.adjacent === 0) return;

    let flagNeighbors = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].flagged) flagNeighbors++;
      }
    }
    if (flagNeighbors !== cell.adjacent) return;

    const next = cloneBoard(board);
    let lost = false;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          const n = next[nr][nc];
          if (!n.revealed && !n.flagged) {
            if (n.mine) {
              for (const row of next) for (const cl of row) if (cl.mine) cl.revealed = true;
              lost = true;
            } else {
              reveal(next, nr, nc);
            }
          }
        }
      }
    }
    setBoard(next);
    if (lost) setGameState("lost");
    else if (checkWin(next)) setGameState("won");
  }, [gameState, board]);

  /* track pressing state for smiley */
  const onGridMouseDown = useCallback(() => {
    if (gameState === "playing" || gameState === "idle") setPressing(true);
  }, [gameState]);
  const onGridMouseUp = useCallback(() => setPressing(false), []);

  useEffect(() => {
    const up = () => setPressing(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  const value = useMemo(
    () => ({
      board,
      gameState,
      time,
      pressing,
      minesRemaining,
      reset,
      handleClick,
      handleRightClick,
      handleChord,
      onGridMouseDown,
      onGridMouseUp,
    }),
    [
      board,
      gameState,
      time,
      pressing,
      minesRemaining,
      reset,
      handleClick,
      handleRightClick,
      handleChord,
      onGridMouseDown,
      onGridMouseUp,
    ],
  );

  return (
    <MinesweeperContext.Provider value={value}>
      {children}
    </MinesweeperContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  View — render once per tile; all share context */
/* ------------------------------------------------------------------ */

export default function Minesweeper() {
  const {
    board,
    gameState,
    time,
    pressing,
    minesRemaining,
    reset,
    handleClick,
    handleRightClick,
    handleChord,
    onGridMouseDown,
    onGridMouseUp,
  } = useMinesweeperContext();

  const gridW = COLS * CELL;
  const gridH = ROWS * CELL;

  return (
    <div
      onPointerDown={e => e.stopPropagation()}
      style={{
        display: "inline-block",
        background: C.surface,
        boxShadow: windowFrame,
        padding: 3,
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
      }}
    >
      {/* Title bar */}
      <div style={{
        background: `linear-gradient(90deg, ${C.titleBar}, ${C.titleEnd})`,
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        marginBottom: 3,
      }}>
        {/* mine icon */}
        <span style={{ fontSize: 12 }}>{"\u{1F4A3}"}</span>
        <span style={{ flex: 1 }}>Minesweeper</span>
      </div>

      {/* Header: counters + smiley */}
      <div style={{
        boxShadow: sunken,
        padding: 4,
        margin: "0 3px 3px 3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <LedDisplay value={minesRemaining} />
        <button
          type="button"
          onClick={reset}
          aria-label="New game"
          style={{
            width: 28,
            height: 28,
            background: C.surface,
            border: "none",
            boxShadow: raised,
            cursor: "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
          onMouseDown={e => e.preventDefault()}
        >
          <SmileyFace state={gameState} pressing={pressing} />
        </button>
        <LedDisplay value={time} />
      </div>

      {/* Grid */}
      <div
        style={{
          boxShadow: sunken,
          margin: "0 3px 3px 3px",
          padding: 3,
        }}
      >
        <div
          onMouseDown={onGridMouseDown}
          onMouseUp={onGridMouseUp}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
            width: gridW,
            height: gridH,
          }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`;

              /* revealed cell */
              if (cell.revealed) {
                let content: ReactNode = null;
                let bg = C.surface;

                if (cell.mine) {
                  content = <span style={{ fontSize: CELL * 0.65 }}>{"\u{1F4A3}"}</span>;
                  // the clicked mine gets red bg — mark it specially
                  if (gameState === "lost") bg = C.surface;
                } else if (cell.adjacent > 0) {
                  content = (
                    <span style={{
                      fontSize: CELL * 0.7,
                      fontWeight: 700,
                      color: NUM_COLORS[cell.adjacent],
                    }}>
                      {cell.adjacent}
                    </span>
                  );
                }

                return (
                  <div
                    key={key}
                    onMouseDown={e => { if (e.button === 1) handleChord(r, c); }}
                    style={{
                      width: CELL,
                      height: CELL,
                      background: bg,
                      borderTop: `1px solid ${C.shadow}`,
                      borderLeft: `1px solid ${C.shadow}`,
                      borderRight: "none",
                      borderBottom: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    {content}
                  </div>
                );
              }

              /* unrevealed cell */
              return (
                <div
                  key={key}
                  onClick={() => handleClick(r, c)}
                  onContextMenu={e => handleRightClick(e, r, c)}
                  onMouseDown={e => { if (e.button === 1) handleChord(r, c); }}
                  style={{
                    width: CELL,
                    height: CELL,
                    background: C.surface,
                    boxShadow: raised,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "default",
                    boxSizing: "border-box",
                  }}
                >
                  {cell.flagged && <span style={{ fontSize: CELL * 0.6 }}>{"\u{1F6A9}"}</span>}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
