"use client";

import { useState } from "react";
import Intro from "./components/Intro";
import PuzzlePhoto from "./components/PuzzlePhoto";
import styles from "./page.module.css";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className={styles.puzzleShell}>
      {started ? <PuzzlePhoto /> : <Intro onStart={() => setStarted(true)} />}
    </main>
  );
}
