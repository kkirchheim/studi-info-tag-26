# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static German-language video classification quiz website. Users view videos and classify them as "Normal" or "Anomalie" (Anomaly), receive immediate feedback, and see a final score.

## Architecture

**Static Site + Client-Side State Management**
- Single-page app (no backend)
- Video metadata auto-generated from file system
- Tailwind CSS + DaisyUI for responsive UI
- Vanilla JavaScript (no frameworks)

**Key Components:**
- `index.html` - Main page structure and layout (German UI)
- `js/app.js` - `VideoQuiz` class managing quiz state, video loading, scoring, and user interactions
- `data/videos.json` - Auto-generated manifest of videos (do not edit directly)
- `generate-manifest.js` - Node.js script to scan directories and regenerate manifest
- `csse-logo.png` - CSSE header logo

**Video Directory Structure:**
```
videos/
├── ano/
│   └── {timestamp}/video/rgb-front.mp4
└── normal/
    └── {timestamp}/video/rgb-front.mp4
```

The manifest generator expects `video/rgb-front.mp4` in each timestamp subdirectory.

## Common Commands

**Run Local Server:**
```bash
python3 -m http.server 8000
# Access at http://localhost:8000
# (Do not use file:// protocol; CORS restrictions will block video.json)
```

**Add/Update Videos:**
```bash
# 1. Add video folders to videos/ano/ or videos/normal/
# 2. Ensure each has video/rgb-front.mp4
node generate-manifest.js
# Regenerates data/videos.json with discovered videos
```

## Key Implementation Details

**Quiz Flow (js/app.js):**
1. Load manifest from `data/videos.json`
2. Welcome screen → "Quiz starten" button
3. Video loop: display video → user selects answer → show feedback (correct/wrong) → next video
4. Results screen: show score, correct/wrong counts, restart button
5. Restart returns to welcome screen

**Styling:**
- Tailwind CSS (CDN) + DaisyUI (CDN)
- Primary color: #0068b4 (CSSE blue)
- Responsive grid for buttons and layout
- Video container uses 16:9 aspect ratio

**German Text:**
All UI labels and messages are in German (e.g., "Normal", "Anomalie", "Richtig", "Falsch").

## Notes

- The video manifest is deterministic: videos are sorted by timestamp string for consistent ordering across sessions
- Videos are shown in the order they appear in the manifest (not randomized)
- No persistent storage; quiz state resets on page reload or restart
- Mobile-friendly: uses DaisyUI responsive grid and viewport meta tag
