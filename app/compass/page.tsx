"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isAuthenticated } from "../auth";
import styles from "./page.module.css";

const LATITUDE = `37°46'56.4"N`;
const LONGITUDE = `122°23'28.0"W`;

// Bearing (deg from north) the needle must point at to reveal the coordinates.
const TARGET_BEARING_DEG = 222;
const TOLERANCE_DEG = 6;
const SCRAMBLE_POOL = "0123456789";

function angularDistance(a: number, b: number) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function scramble(text: string, distanceDeg: number) {
  const intensity = Math.min(1, distanceDeg / 90);
  return text
    .split("")
    .map((char, index) => {
      if (!/[0-9]/.test(char)) return char;
      if (pseudoRandom(distanceDeg * 13.37 + index * 7.77) >= intensity) return char;
      const pick = pseudoRandom(distanceDeg * 3.14 + index * 91.7);
      return SCRAMBLE_POOL[Math.floor(pick * SCRAMBLE_POOL.length)];
    })
    .join("");
}

export default function CompassPage() {
  const [allowed, setAllowed] = useState(false);
  const [angleDeg, setAngleDeg] = useState(0);
  const [matched, setMatched] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const compassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setAllowed(true);
      return;
    }
    window.location.assign("/login");
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const compass = compassRef.current;
    if (!compass) return;

    const rect = compass.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const bearing = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const normalized = (bearing + 360) % 360;

    setAngleDeg(normalized);
    setMatched((wasMatched) => {
      const isMatch = angularDistance(normalized, TARGET_BEARING_DEG) <= TOLERANCE_DEG;
      if (isMatch && !wasMatched) setBurstId((id) => id + 1);
      return isMatch;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  if (!allowed) return null;

  const distance = angularDistance(angleDeg, TARGET_BEARING_DEG);
  const latitude = matched ? LATITUDE : scramble(LATITUDE, distance);
  const longitude = matched ? LONGITUDE : scramble(LONGITUDE, distance);

  return (
    <main className={styles.page}>
      <div className={styles.compass} ref={compassRef}>
        <span className={styles.tick} data-dir="N">N</span>
        <span className={styles.tick} data-dir="E">E</span>
        <span className={styles.tick} data-dir="S">S</span>
        <span className={styles.tick} data-dir="W">W</span>
        <div className={styles.needle} style={{ transform: `rotate(${angleDeg}deg)` }} />
        {matched && <span key={burstId} className={styles.burst} />}
      </div>

      <p className={styles.coordinates}>
        <span>{latitude}</span>
        <span>{longitude}</span>
      </p>
    </main>
  );
}
