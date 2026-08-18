"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import styles from "./page.module.css";

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
      <p className={styles.subtitle}>Coming soon.</p>
    </main>
  );
}
