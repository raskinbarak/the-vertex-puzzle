"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function PuzzlePhoto() {
  const [revealed, setRevealed] = useState(false);
  const handleReveal = () => setRevealed(true);

  const imageUrl = "/observation-photo.jpg";

  return (
    <section className="photo-stage" aria-label="Puzzle photograph">
      <img className="puzzle-photo" src={imageUrl} alt="" />

      <button
        type="button"
        className="peak-hitbox"
        aria-label="Inspect peak"
        onMouseEnter={handleReveal}
        onFocus={handleReveal}
        onClick={handleReveal}
      />

      <a
        className={`download-link ${revealed ? "is-visible" : ""}`}
        href={imageUrl}
        download
        aria-label="Download original photo"
      >
        <Download size={16} strokeWidth={2.25} aria-hidden="true" />
      </a>
    </section>
  );
}
