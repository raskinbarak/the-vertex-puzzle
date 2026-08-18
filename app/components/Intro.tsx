"use client";

import { useState } from "react";
import styles from "./Intro.module.css";

export default function Intro({ onStart }: { onStart: () => void }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className={styles.page} aria-label="Welcome">
      <div className={styles.card}>
        <svg
          className={styles.peaks}
          viewBox="0 0 200 60"
          aria-hidden="true"
          focusable="false"
        >
          <polygon className={styles.peakBack} points="0,60 55,10 110,60" />
          <polygon className={styles.peakFront} points="70,60 130,22 200,60" />
        </svg>

        <h1 className={styles.title}>the-vertex-puzzle</h1>
        <p className={styles.tagline}>a computer-science digital escape room</p>
        <p className={styles.instructions}>
          Follow the clues, investigate the system, and find your way to the
          summit. When you&apos;re ready, hit{" "}
          <span
            tabIndex={0}
            onMouseEnter={() => setRevealed(true)}
            onFocus={() => setRevealed(true)}
          >
            Go
          </span>
          !
        </p>
      </div>

      <button
        type="button"
        className={`${styles.button} ${revealed ? styles.buttonVisible : ""}`}
        onClick={onStart}
      >
        Go!
      </button>
    </section>
  );
}
