# The Vertex Puzzle

Minimal Next.js puzzle site for a fictional computer-science digital escape room.

## Tech

- Next.js (App Router)
- TypeScript
- Simple CSS
- No database, auth, ORM, or external backend

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project Shape

- `app/page.tsx`: Entry page and `EXIF` query guard
- `app/PuzzlePhoto.tsx`: First puzzle photograph and reveal/download interaction
- `app/layout.tsx`: Root layout and metadata
- `app/globals.css`: Minimal responsive styling
- `public/observation-photo.jpg`: Original downloadable puzzle image with clue metadata

## Puzzle 1

- The page shows a single photo.
- The download control is revealed from a hotspot interaction.
- Download points directly to the original file in `public/`.

## Design Rules For Future Puzzles

- Keep puzzle logic local and simple.
- If a puzzle needs auth/API/log behavior, fake only the minimum needed for the story.
- Do not add real user accounts, sessions, sensitive data, or production infrastructure.
