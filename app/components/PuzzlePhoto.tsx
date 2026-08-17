"use client";

import type { FocusEvent, MouseEvent } from "react";
import { PEAK_HINT_EVENT } from "../constants";
import styles from "./PuzzlePhoto.module.css";

const JIMPL_QUERY_KEY = "jimpl";
const USER_COMMENT_QUERY_KEY = "UserComment";

export default function PuzzlePhoto() {
  const revealWithSpark = (x: number, y: number, width = 0, height = 0) => {
    const params = new URLSearchParams(window.location.search);

    window.dispatchEvent(
      new CustomEvent(PEAK_HINT_EVENT, { detail: { x, y, width, height } }),
    );

    if (!params.has(JIMPL_QUERY_KEY) && !params.has(USER_COMMENT_QUERY_KEY)) {
      window.history.replaceState({}, "", `/?${JIMPL_QUERY_KEY}`);
    } else if (params.has(JIMPL_QUERY_KEY)) {
      window.history.replaceState({}, "", `/?${USER_COMMENT_QUERY_KEY}`);
    } else if (params.has(USER_COMMENT_QUERY_KEY)) {
      window.history.replaceState({}, "", `/?${JIMPL_QUERY_KEY}`);
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
