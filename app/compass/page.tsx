"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import styles from "./page.module.css";

const LATITUDE = `37°46'56.4"N`;
const LONGITUDE = `122°23'28.0"W`;

export default function CompassPage() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setAllowed(true);
      return;
    }
    window.location.assign("/login");
  }, []);

  if (!allowed) return null;

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Compass</h1>

      <div className={styles.compass}>
        <span className={styles.north}>N</span>
        <span className={styles.needle} />
      </div>

      <p className={styles.coordinates}>
        <span>{LATITUDE}</span>
        <span>{LONGITUDE}</span>
      </p>
    </main>
  );
}
