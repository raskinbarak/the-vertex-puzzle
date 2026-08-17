"use client";

import type { FocusEvent, MouseEvent } from "react";
import { PEAK_HINT_EVENT } from "../constants";
import styles from "./PuzzlePhoto.module.css";

const EXIF_QUERY_KEY = "EXIF";
const COMMENT_QUERY_KEY = "Comment";

export default function PuzzlePhoto() {
  const revealWithSpark = (x: number, y: number, width = 0, height = 0) => {
    const params = new URLSearchParams(window.location.search);

    window.dispatchEvent(
      new CustomEvent(PEAK_HINT_EVENT, { detail: { x, y, width, height } }),
    );

    if (!params.has(EXIF_QUERY_KEY) && !params.has(COMMENT_QUERY_KEY)) {
      window.history.replaceState({}, "", `/?${EXIF_QUERY_KEY}`);
    } else if (params.has(EXIF_QUERY_KEY)) {
      window.history.replaceState({}, "", `/?${COMMENT_QUERY_KEY}`);
    } else if (params.has(COMMENT_QUERY_KEY)) {
      window.history.replaceState({}, "", `/?${EXIF_QUERY_KEY}`);
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    revealWithSpark(event.clientX, event.clientY);
  };

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    revealWithSpark(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      rect.width,
      rect.height,
    );
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
