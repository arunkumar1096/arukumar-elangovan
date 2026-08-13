'use client';
import { useState } from 'react';

const DEFAULTS = {
  // Name
  fontSize: 4.6,
  lineHeight: 1.16,
  letterSpacing: 0.005,
  fontWeight: 500,
  fontStyle: 'italic' as 'normal' | 'italic',
  // Designer row
  designerOffset: 0,
  designerFontSize: 1.175,  // approx mid of clamp(1rem, 1.4vw, 1.35rem)
  designerLineHeight: 1.4,
  designerLetterSpacing: 0.03,
  designerFontWeight: 400,
  designerFontStyle: 'normal' as 'normal' | 'italic',
};

export default function HeroNameTuner() {
  const [open, setOpen] = useState(true);
  const [v, setV] = useState(DEFAULTS);

  const set = <K extends keyof typeof DEFAULTS>(key: K, val: (typeof DEFAULTS)[K]) =>
    setV(prev => ({ ...prev, [key]: val }));

  const lsDisplay   = v.letterSpacing.toFixed(3);
  const dLsDisplay  = v.designerLetterSpacing.toFixed(3);

  const css = `
    [data-name-heading] {
      font-size: ${v.fontSize}rem !important;
      line-height: ${v.lineHeight} !important;
      letter-spacing: ${lsDisplay}em !important;
      font-weight: ${v.fontWeight} !important;
      font-style: ${v.fontStyle} !important;
    }
    [data-designer-row] {
      margin-left: ${v.designerOffset}rem !important;
      font-size: ${v.designerFontSize}rem !important;
      line-height: ${v.designerLineHeight} !important;
      letter-spacing: ${dLsDisplay}em !important;
      font-weight: ${v.designerFontWeight} !important;
      font-style: ${v.designerFontStyle} !important;
    }
  `;

  const code = `// name
fontSize: '${v.fontSize}rem'
lineHeight: ${v.lineHeight.toFixed(2)}
letterSpacing: '${lsDisplay}em'
fontWeight: ${v.fontWeight}
fontStyle: '${v.fontStyle}'

// designer row
marginLeft: '${v.designerOffset}rem'
fontSize: '${v.designerFontSize}rem'
lineHeight: ${v.designerLineHeight.toFixed(2)}
letterSpacing: '${dLsDisplay}em'
fontWeight: ${v.designerFontWeight}
fontStyle: '${v.designerFontStyle}'`;

  return (
    <>
      <style>{css}</style>
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, fontFamily: 'var(--font-geist-mono), monospace', fontSize: 11 }}>
        <button onClick={() => setOpen(o => !o)} style={btnStyle}>
          {open ? '✕ tuner' : '⚙ name tuner'}
        </button>

        {open && (
          <div style={cardStyle}>

            <SectionLabel>name</SectionLabel>
            <SliderRow label={`size — ${v.fontSize}rem`} min={2} max={8} step={0.1} value={v.fontSize} onChange={n => set('fontSize', n)} />
            <SliderRow label={`line height — ${v.lineHeight.toFixed(2)}`} min={0.85} max={1.6} step={0.01} value={v.lineHeight} onChange={n => set('lineHeight', n)} />
            <SliderRow label={`letter spacing — ${lsDisplay}em`} min={-0.05} max={0.12} step={0.005} value={v.letterSpacing} onChange={n => set('letterSpacing', n)} />
            <SliderRow label={`weight — ${v.fontWeight}`} min={100} max={900} step={100} value={v.fontWeight} onChange={n => set('fontWeight', n)} />
            <Row label="style">
              <StyleToggle value={v.fontStyle} onChange={s => set('fontStyle', s)} />
            </Row>

            <hr style={divider} />

            <SectionLabel>designer row</SectionLabel>
            <Row label={`left offset — ${v.designerOffset}rem`}>
              <input
                type="number"
                value={v.designerOffset}
                step={0.25}
                onChange={e => set('designerOffset', +e.target.value)}
                style={numInputStyle}
              />
            </Row>
            <SliderRow label={`size — ${v.designerFontSize}rem`} min={0.6} max={3} step={0.05} value={v.designerFontSize} onChange={n => set('designerFontSize', n)} />
            <SliderRow label={`line height — ${v.designerLineHeight.toFixed(2)}`} min={0.85} max={2} step={0.01} value={v.designerLineHeight} onChange={n => set('designerLineHeight', n)} />
            <SliderRow label={`letter spacing — ${dLsDisplay}em`} min={-0.05} max={0.12} step={0.005} value={v.designerLetterSpacing} onChange={n => set('designerLetterSpacing', n)} />
            <SliderRow label={`weight — ${v.designerFontWeight}`} min={100} max={900} step={100} value={v.designerFontWeight} onChange={n => set('designerFontWeight', n)} />
            <Row label="style">
              <StyleToggle value={v.designerFontStyle} onChange={s => set('designerFontStyle', s)} />
            </Row>

            <div style={codeStyle}>{code}</div>

            <button onClick={() => setV(DEFAULTS)} style={resetStyle}>reset</button>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Sub-components ─────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ color: 'rgba(0,0,0,.25)', letterSpacing: '0.08em', fontSize: 9, textTransform: 'uppercase', marginBottom: 10 }}>{children}</div>;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ color: 'rgba(0,0,0,.4)', marginBottom: 4, letterSpacing: '0.03em' }}>{label}</div>
      {children}
    </div>
  );
}

function SliderRow({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (n: number) => void }) {
  return (
    <Row label={label}>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)} style={{ width: '100%' }} />
    </Row>
  );
}

function StyleToggle({ value, onChange }: { value: 'normal' | 'italic'; onChange: (v: 'normal' | 'italic') => void }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {(['normal', 'italic'] as const).map(s => (
        <button key={s} onClick={() => onChange(s)} style={{
          padding: '3px 12px', borderRadius: 4,
          border: '1px solid rgba(0,0,0,.14)',
          background: value === s ? 'rgba(0,0,0,.85)' : 'transparent',
          color: value === s ? '#fff' : 'rgba(0,0,0,.55)',
          cursor: 'pointer', fontFamily: 'inherit', fontSize: 11,
          fontStyle: s === 'italic' ? 'italic' : 'normal',
          letterSpacing: '0.02em', transition: 'all 120ms ease',
        }}>{s}</button>
      ))}
    </div>
  );
}

/* ── Styles ─────────────────────────────────── */

const btnStyle: React.CSSProperties = {
  display: 'block', marginLeft: 'auto',
  background: 'rgba(0,0,0,.85)', color: '#fff',
  border: 'none', borderRadius: 6, padding: '5px 12px',
  cursor: 'pointer', fontSize: 11, fontFamily: 'inherit', letterSpacing: '0.04em',
};

const cardStyle: React.CSSProperties = {
  marginTop: 8,
  background: 'rgba(255,255,255,0.96)',
  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(0,0,0,.09)', borderRadius: 10,
  padding: '14px 16px', width: 272,
  boxShadow: '0 4px 24px rgba(0,0,0,.10)',
  maxHeight: 'calc(100vh - 80px)', overflowY: 'auto',
};

const divider: React.CSSProperties = { margin: '12px 0', borderTop: '1px solid rgba(0,0,0,.07)', borderBottom: 'none' };

const numInputStyle: React.CSSProperties = {
  width: '100%', padding: '4px 8px', fontSize: 11,
  fontFamily: 'inherit', border: '1px solid rgba(0,0,0,.14)',
  borderRadius: 4, background: 'rgba(0,0,0,.03)',
  color: 'inherit', boxSizing: 'border-box',
};

const codeStyle: React.CSSProperties = {
  marginTop: 12, padding: '8px 10px',
  background: 'rgba(0,0,0,.04)', borderRadius: 6,
  fontSize: 10, lineHeight: 1.65, color: 'rgba(0,0,0,.5)',
  whiteSpace: 'pre', userSelect: 'all', cursor: 'text',
};

const resetStyle: React.CSSProperties = {
  marginTop: 10, width: '100%', padding: '4px 0',
  background: 'transparent', border: '1px solid rgba(0,0,0,.12)',
  borderRadius: 5, cursor: 'pointer', fontFamily: 'inherit',
  fontSize: 10, color: 'rgba(0,0,0,.4)', letterSpacing: '0.04em',
};
