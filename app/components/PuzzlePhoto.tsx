"use client";

import type { FocusEvent, MouseEvent } from "react";
import styles from "./PuzzlePhoto.module.css";

const EXIF_QUERY_KEY = "EXIF";

export default function PuzzlePhoto() {
  const revealWithSpark = (x: number, y: number) => {
    const params = new URLSearchParams(window.location.search);
    if (params.has(EXIF_QUERY_KEY)) return;

    window.dispatchEvent(new CustomEvent("vertex:peak-hint", { detail: { x, y } }));
    window.history.replaceState({}, "", `/?${EXIF_QUERY_KEY}`);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    revealWithSpark(event.clientX, event.clientY);
  };

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    revealWithSpark(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    revealWithSpark(event.clientX, event.clientY);
  };

  const imageUrl = "/mountain.jpg";

  return (
    <section className={styles.photoStage} aria-label="Puzzle photograph">
      <img className={styles.puzzlePhoto} src={imageUrl} alt="" />

      <button
        type="button"
        className={styles.peakHitbox}
        aria-label="Inspect peak"
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        onClick={handleClick}
      />
    </section>
  );
}
