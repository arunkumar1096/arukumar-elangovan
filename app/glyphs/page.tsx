"use client";

import { useState } from "react";

const FONTS = [
  { label: "Square", variable: "var(--font-geist-pixel-square)" },
  { label: "Grid", variable: "var(--font-geist-pixel-grid)" },
  { label: "Circle", variable: "var(--font-geist-pixel-circle)" },
  { label: "Triangle", variable: "var(--font-geist-pixel-triangle)" },
  { label: "Line", variable: "var(--font-geist-pixel-line)" },
] as const;

const SECTIONS = [
  {
    title: "Uppercase",
    glyphs: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  },
  {
    title: "Lowercase",
    glyphs: [..."abcdefghijklmnopqrstuvwxyz"],
  },
  {
    title: "Digits",
    glyphs: [..."0123456789"],
  },
  {
    title: "Superscripts & Fractions",
    glyphs: [..."\u00B9\u00B2\u00B3\u00BC\u00BD\u00BE"],
  },
  {
    title: "Arrows",
    glyphs: [..."\u2190\u2191\u2192\u2193\u2194\u2195\u2196\u2197\u2198\u2199\u21A9\u21AA\u21B0\u21B1\u21B4\u21B5\u21E4\u21E5\u21E7"],
  },
  {
    title: "Math",
    glyphs: [..."+-=<>|~\u00AC\u00B1\u00D7\u00F7\u2044\u2202\u2206\u220F\u2211\u2212\u221A\u221E\u222B\u2248\u2260\u2264\u2265"],
  },
  {
    title: "Currency",
    glyphs: [..."$\u00A2\u00A3\u00A4\u00A5\u20AC"],
  },
  {
    title: "Symbols & Shapes",
    glyphs: [..."\u00A9\u00AE\u2117\u2120\u2122\u2116\u00B0\u00A7\u00B6\u00B7\u2022\u2020\u2021\u25B2\u25CA\u00A6\u301C\u00AA\u00BA\u00B5"],
  },
  {
    title: "Quotes & Dashes",
    glyphs: ["\u00AB", "\u00BB", "\u2039", "\u203A", "\u2018", "\u2019", "\u201A", "\u201C", "\u201D", "\u201E", "\u2013", "\u2014", "\u2026", "\u2032", "\u2033"],
  },
  {
    title: "Punctuation",
    glyphs: [..."!#%&()*,./:;?@^_`", '"', "'", "[", "\\", "]", "{", "}", "\u00A1", "\u00BF", "\u2030"],
  },
  {
    title: "Diacritics & Modifiers",
    glyphs: [..."\u00A8\u00AF\u00B4\u00B8\u02BB\u02C6\u02C7\u02D8\u02D9\u02DA\u02DB\u02DC\u02DD"],
  },
  {
    title: "Greek",
    glyphs: [..."\u039B\u03A9\u03BB\u03BC\u03C0"],
  },
  {
    title: "Ligatures & Special",
    glyphs: ["\uFB01", "\uFB02", "\u0192", "\u018F", "\u0259", "\u0237", "\uA78B", "\uA78C", "\u1E9E", "\u00DF", "\uF8FF"],
  },
  {
    title: "Accented \u2014 Uppercase",
    glyphs: [..."\u00C0\u00C1\u00C2\u00C3\u00C4\u00C5\u00C6\u00C7\u00C8\u00C9\u00CA\u00CB\u00CC\u00CD\u00CE\u00CF\u00D0\u00D1\u00D2\u00D3\u00D4\u00D5\u00D6\u00D8\u00D9\u00DA\u00DB\u00DC\u00DD\u00DE\u01CD"],
  },
  {
    title: "Accented \u2014 Lowercase",
    glyphs: [..."\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5\u00E6\u00E7\u00E8\u00E9\u00EA\u00EB\u00EC\u00ED\u00EE\u00EF\u00F0\u00F1\u00F2\u00F3\u00F4\u00F5\u00F6\u00F8\u00F9\u00FA\u00FB\u00FC\u00FD\u00FE\u00FF\u01CE"],
  },
  {
    title: "Extended Latin",
    glyphs: [
      ..."\u0100\u0101\u0102\u0103\u0104\u0105\u0106\u0107\u0108\u0109\u010A\u010B\u010C\u010D\u010E\u010F",
      ..."\u0110\u0111\u0112\u0113\u0116\u0117\u0118\u0119\u011A\u011B\u011C\u011D\u011E\u011F\u0120\u0121",
      ..."\u0122\u0123\u0124\u0125\u0126\u0127\u0128\u0129\u012A\u012B\u012E\u012F\u0130\u0131\u0132\u0133",
      ..."\u0134\u0135\u0136\u0137\u0139\u013A\u013B\u013C\u013D\u013E\u0141\u0142\u0143\u0144\u0145\u0146",
      ..."\u0147\u0148\u014C\u014D\u0150\u0151\u0152\u0153\u0154\u0155\u0156\u0157\u0158\u0159\u015A\u015B",
      ..."\u015C\u015D\u015E\u015F\u0160\u0161\u0162\u0163\u0164\u0165\u0168\u0169\u016A\u016B\u016C\u016D",
      ..."\u016E\u016F\u0170\u0171\u0172\u0173\u0174\u0175\u0176\u0177\u0178\u0179\u017A\u017B\u017C\u017D\u017E",
      ..."\u0218\u0219\u021A\u021B",
      ..."\u1E20\u1E21\u1E80\u1E81\u1E82\u1E83\u1E84\u1E85",
      ..."\u1EBC\u1EBD\u1EF2\u1EF3\u1EF8\u1EF9",
    ],
  },
];

export default function GlyphsPage() {
  const [activeFont, setActiveFont] = useState(0);
  const [size, setSize] = useState(48);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl px-6 lg:px-20 py-16">
        <header className="mb-12">
          <h1 className="mb-2 text-3xl font-medium tracking-tight">
            Geist Pixel
          </h1>
          <p className="text-[var(--muted)]">
            All glyphs across five pixel variants
          </p>
        </header>

        {/* Controls */}
        <div className="mb-10 flex flex-wrap items-end gap-8">
          {/* Font selector */}
          <div className="flex gap-1 rounded-lg border border-[var(--border)] p-1">
            {FONTS.map((font, i) => (
              <button
                key={font.label}
                onClick={() => setActiveFont(i)}
                className="rounded-md px-3 py-1.5 text-sm transition-colors"
                style={{
                  background:
                    activeFont === i
                      ? "var(--foreground)"
                      : "transparent",
                  color:
                    activeFont === i
                      ? "var(--background)"
                      : "var(--muted)",
                }}
              >
                {font.label}
              </button>
            ))}
          </div>

          {/* Size slider */}
          <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
            Size
            <input
              type="range"
              min={24}
              max={120}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-32 accent-[var(--foreground)]"
            />
            <span className="w-10 tabular-nums">{size}px</span>
          </label>
        </div>

        {/* Preview sentence */}
        <div
          className="mb-14 rounded-xl border border-[var(--border)] p-8"
          style={{
            fontFamily: FONTS[activeFont].variable,
            fontSize: size,
            lineHeight: 1.3,
          }}
        >
          The quick brown fox jumps over the lazy dog 0123456789
        </div>

        {/* Glyph grid sections */}
        {SECTIONS.map((section) => (
          <section key={section.title} className="mb-12">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
              {section.title}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-px rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--border)]">
              {section.glyphs.map((glyph, i) => (
                <div
                  key={`${section.title}-${i}`}
                  className="flex flex-col items-center justify-center gap-2 bg-[var(--background)] py-5 transition-colors hover:bg-[var(--surface)]"
                >
                  <span
                    style={{
                      fontFamily: FONTS[activeFont].variable,
                      fontSize: size,
                      lineHeight: 1,
                    }}
                  >
                    {glyph}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--muted)]">
                    {glyph === " "
                      ? "SP"
                      : `U+${glyph.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* All five fonts side-by-side */}
        <section className="mb-12">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
            Compare Variants
          </h2>
          <div className="grid gap-4">
            {FONTS.map((font) => (
              <div
                key={font.label}
                className="flex items-center gap-6 rounded-xl border border-[var(--border)] px-6 py-5"
              >
                <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
                  {font.label}
                </span>
                <span
                  className="truncate"
                  style={{
                    fontFamily: font.variable,
                    fontSize: 32,
                    lineHeight: 1,
                  }}
                >
                  AaBb 0123 →↗↘← ∞≠∑ ▲◊ ©™
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
