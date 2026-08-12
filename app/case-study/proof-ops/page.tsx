"use client";

import { useState, useRef, useEffect } from "react";
import NavBar from "../../components/nav-bar";
import Link from "next/link";

// ← Change this to your desired password
const PASSWORD = "darkmode";

export default function MoEngageDarkModePage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const attempt = () => {
    if (value === PASSWORD) {
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      setValue("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") attempt();
    if (error) setError(false);
  };

  if (unlocked) {
    return (
      <div className="min-h-screen">
        <NavBar showBack scrollTitle="MoEngage — Dark Mode" />
        <main className="max-w-[44rem] mx-auto px-6 pt-16 pb-32">
          <p
            className="text-[13px] font-[550] tracking-[0.06em] uppercase text-[rgba(0,0,0,.35)] mb-4"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            MoEngage · Dark Mode
          </p>
          <h1
            className="text-[32px] sm:text-[42px] font-[500] leading-[1.1] tracking-[-0.02em] text-[rgba(0,0,0,.85)] mb-6"
            style={{ fontFamily: "var(--font-mackinac), serif" }}
          >
            Case study coming soon.
          </h1>
          <p className="text-[15px] leading-[1.7] text-[rgba(0,0,0,.55)]">
            The full write-up is being prepared. Check back soon.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar showBack />

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-[360px]">

          {/* Lock icon */}
          <div className="flex justify-center mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--surface)]"
              style={{ boxShadow: "var(--shadow-flush)" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="3.5" y="9" width="13" height="9.5" rx="2" stroke="rgba(0,0,0,.45)" strokeWidth="1.25" />
                <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="rgba(0,0,0,.45)" strokeWidth="1.25" strokeLinecap="round" />
                <circle cx="10" cy="13.5" r="1" fill="rgba(0,0,0,.45)" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-[22px] font-[500] leading-[1.2] tracking-[-0.02em] text-[rgba(0,0,0,.85)] text-center mb-2"
            style={{ fontFamily: "var(--font-mackinac), serif" }}
          >
            MoEngage — Dark Mode
          </h1>
          <p className="text-[13px] text-[rgba(0,0,0,.45)] text-center leading-[1.6] mb-8">
            This case study is password protected.
          </p>

          {/* Password input */}
          <div
            className={`transition-transform duration-100 ${shaking ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
            style={shaking ? {
              animation: "shake 0.4s ease-in-out",
            } : undefined}
          >
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                boxShadow: error
                  ? "0 0 0 1.5px rgba(220,38,38,.5), var(--shadow-flush)"
                  : "0 0 0 1.5px var(--border), var(--shadow-flush)",
              }}
            >
              <input
                ref={inputRef}
                type="password"
                value={value}
                onChange={(e) => { setValue(e.target.value); setError(false); }}
                onKeyDown={handleKeyDown}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full bg-[var(--background)] text-[14px] text-[rgba(0,0,0,.85)] placeholder:text-[rgba(0,0,0,.3)] px-4 h-11 outline-none pr-[72px]"
              />
              <button
                onClick={attempt}
                className="absolute right-0 top-0 h-full px-4 text-[13px] font-[500] text-[rgba(0,0,0,.55)] hover:text-[rgba(0,0,0,.85)] transition-colors border-l border-[var(--border)]"
              >
                Unlock
              </button>
            </div>

            {error && (
              <p className="mt-2 text-[12px] text-red-500 text-center">
                Incorrect password. Try again.
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-[11px] text-[rgba(0,0,0,.3)] uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>or</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Schedule a call */}
          <Link
            href="https://www.linkedin.com/in/arunkumar-elangovan10/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-lg text-[13px] font-[500] text-[rgba(0,0,0,.65)] hover:text-[rgba(0,0,0,.85)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors"
            style={{ boxShadow: "var(--shadow-flush)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="1" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M1 6.5h12" stroke="currentColor" strokeWidth="1.1" />
              <path d="M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            Schedule a call to know more
          </Link>

        </div>
      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
