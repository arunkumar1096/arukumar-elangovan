'use client';
import { useState, useEffect } from 'react';
import { DEFAULT_CIRCLE_COLORS } from './hero-circle';

type Colors = typeof DEFAULT_CIRCLE_COLORS;

const STOPS: { key: keyof Colors; label: string }[] = [
  { key: 'c0', label: 'Arunkumar — top' },
  { key: 'c1', label: 'Arunkumar bottom · Merlin top' },
  { key: 'c2', label: 'Merlin bottom · MoE top' },
  { key: 'c3', label: 'MoE bottom · Hippo top' },
  { key: 'c4', label: 'Hippo — bottom' },
];

export default function HeroCircleColorTuner() {
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState<Colors>({ ...DEFAULT_CIRCLE_COLORS });

  // Push to animation on every change
  useEffect(() => {
    (window as any).__heroCircleColors = colors;
    (window as any).__heroRedraw?.();
  }, [colors]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { delete (window as any).__heroCircleColors; };
  }, []);

  const set = (key: keyof Colors, val: string) =>
    setColors(prev => ({ ...prev, [key]: val }));

  const reset = () => setColors({ ...DEFAULT_CIRCLE_COLORS });

  const code = STOPS.map(s => `${s.key}: '${colors[s.key]}', // ${s.label}`).join('\n');

  return (
    <div style={panelStyle}>
      <button onClick={() => setOpen(o => !o)} style={btnStyle}>
        {open ? '✕ circle colours' : '⚙ circle colours'}
      </button>

      {open && (
        <div style={cardStyle}>
          <div style={sectionLabel}>gradient stops</div>

          {STOPS.map(({ key, label }) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                {/* colour swatch + picker */}
                <label style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 4,
                    background: colors[key],
                    border: '1px solid rgba(0,0,0,.12)',
                  }} />
                  <input
                    type="color"
                    value={colors[key]}
                    onChange={e => set(key, e.target.value)}
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', top: 0, left: 0, cursor: 'pointer' }}
                  />
                </label>
                {/* hex input */}
                <input
                  type="text"
                  value={colors[key]}
                  maxLength={7}
                  onChange={e => {
                    const v = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) set(key, v);
                  }}
                  style={hexInputStyle}
                />
              </div>
              <div style={{ color: 'rgba(0,0,0,.35)', fontSize: 10, letterSpacing: '0.03em' }}>{label}</div>
            </div>
          ))}

          {/* Preview strip */}
          <div style={{
            height: 32, borderRadius: 6, marginBottom: 12,
            background: `linear-gradient(90deg, ${colors.c0}, ${colors.c1}, ${colors.c2}, ${colors.c3}, ${colors.c4})`,
            border: '1px solid rgba(0,0,0,.08)',
          }} />

          {/* Code readout */}
          <div style={codeStyle}>{code}</div>

          <button onClick={reset} style={resetStyle}>reset to defaults</button>
        </div>
      )}
    </div>
  );
}

/* ── Styles ─────────────────────────────────── */

const panelStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 9999,
  fontFamily: 'var(--font-geist-mono), monospace',
  fontSize: 11,
};

const btnStyle: React.CSSProperties = {
  display: 'block',
  background: 'rgba(0,0,0,.85)',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '5px 12px',
  cursor: 'pointer',
  fontSize: 11,
  fontFamily: 'inherit',
  letterSpacing: '0.04em',
};

const cardStyle: React.CSSProperties = {
  marginTop: 8,
  background: 'rgba(255,255,255,0.96)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(0,0,0,.09)',
  borderRadius: 10,
  padding: '14px 16px',
  width: 280,
  boxShadow: '0 4px 24px rgba(0,0,0,.10)',
};

const sectionLabel: React.CSSProperties = {
  color: 'rgba(0,0,0,.25)',
  letterSpacing: '0.08em',
  fontSize: 9,
  textTransform: 'uppercase',
  marginBottom: 12,
};

const hexInputStyle: React.CSSProperties = {
  flex: 1,
  padding: '4px 8px',
  fontSize: 11,
  fontFamily: 'inherit',
  border: '1px solid rgba(0,0,0,.14)',
  borderRadius: 4,
  background: 'rgba(0,0,0,.03)',
  color: 'inherit',
  letterSpacing: '0.05em',
};

const codeStyle: React.CSSProperties = {
  padding: '8px 10px',
  background: 'rgba(0,0,0,.04)',
  borderRadius: 6,
  fontSize: 10,
  lineHeight: 1.7,
  color: 'rgba(0,0,0,.5)',
  whiteSpace: 'pre',
  userSelect: 'all',
  cursor: 'text',
  marginBottom: 10,
};

const resetStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 0',
  background: 'rgba(0,0,0,.85)',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 11,
  color: '#fff',
  letterSpacing: '0.05em',
};
