# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 portfolio site using the App Router with Tailwind CSS v4.

### Key Structure

- **`app/page.tsx`** — Homepage with bento grid layout of projects and interactive components
- **`app/case-study/[slug]/page.tsx`** — Dynamic case study template with sticky section navigation, lightbox, and reusable content components (Section, Paragraph, ImageBlock, KeyGaps, WhatWorked, etc.)
- **`app/components/`** — Interactive bento box components (Minesweeper game, vintage TV)
- **`app/api/minesweeper/route.ts`** — Simple GET/POST API for global win counter (mock, ready for database)

### Design System

CSS variables defined in `globals.css`:
- `--background`, `--foreground`, `--muted`, `--accent`, `--border`
- Bento grid uses custom `.projects-grid` with `col-span-*` and `row-span-*` classes
- Respects `prefers-reduced-motion` for animations

### Fonts

Uses Geist Sans and Geist Mono via `next/font/google`, loaded in `layout.tsx`.
