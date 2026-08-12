'use client';
import { useState, useEffect } from 'react';

const OPTIONS = [
  { label: 'White', value: '#FFFFFF' },
  { label: 'Grey',  value: '#EEEEEE' },
];

export default function BgToggle() {
  const [idx, setIdx] = useState(1); // start on #EEEEEE

  useEffect(() => {
    document.documentElement.style.setProperty('--background', OPTIONS[idx].value);
    return () => {
      // reset to the CSS-defined value on unmount
      document.documentElement.style.removeProperty('--background');
    };
  }, [idx]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-[var(--border)] backdrop-blur-sm px-3 py-2"
      style={{ background: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 12px rgba(0,0,0,.1)' }}
    >
      <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(0,0,0,.4)', letterSpacing: '0.04em' }}>
        BG
      </span>
      {OPTIONS.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => setIdx(i)}
          title={opt.value}
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: opt.value,
            border: i === idx ? '2px solid rgba(0,0,0,.5)' : '2px solid rgba(0,0,0,.15)',
            transform: i === idx ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 120ms ease, border-color 120ms ease',
            flexShrink: 0,
          }}
          aria-label={`Switch background to ${opt.label}`}
        />
      ))}
      <span style={{ fontSize: 11, fontFamily: 'var(--font-geist-mono)', color: 'rgba(0,0,0,.5)' }}>
        {OPTIONS[idx].value}
      </span>
    </div>
  );
}
