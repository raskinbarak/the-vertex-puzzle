import PuzzlePhoto from "./components/PuzzlePhoto";
import styles from "./page.module.css";
export default function Home() {

  return (
    <main className={styles.puzzleShell}>
      <PuzzlePhoto />
    </main>
  );
}
