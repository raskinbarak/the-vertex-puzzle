"use client";

import { useEffect, useState } from "react";
import { ELEMENTS, type ChemicalElement, type ElementSeries } from "../elements/data";
import styles from "./PeriodicTable.module.css";

const SOLUTION = new Set([8, 19]);
const REDIRECT_DELAY_MS = 1600;
const SERIES_LABELS: Record<ElementSeries, string> = {
  lanthanide: "57-71",
  actinide: "89-103",
};

function ElementTile({
  element,
  selected,
  onSelect,
  style,
}: {
  element: ChemicalElement;
  selected: boolean;
  onSelect: (atomicNumber: number) => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      className={styles.element}
      style={style}
      aria-label={`${element.name}, ${element.symbol}, atomic number ${element.atomicNumber}`}
      aria-pressed={selected}
      data-atomic-number={element.atomicNumber}
      onClick={() => onSelect(element.atomicNumber)}
    >
      <span className={styles.atomicNumber}>{element.atomicNumber}</span>
      <strong className={styles.symbol}>{element.symbol}</strong>
    </button>
  );
}

export default function PeriodicTable() {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  const isSolved = selected.size === SOLUTION.size && [...SOLUTION].every((number) => selected.has(number));

  useEffect(() => {
    if (!isSolved) return;

    const redirectTimer = window.setTimeout(() => {
      window.location.assign("/login");
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(redirectTimer);
  }, [isSolved]);

  const selectElement = (atomicNumber: number) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(atomicNumber)) {
        next.delete(atomicNumber);
      } else {
        next.add(atomicNumber);
      }
      return next;
    });
  };

  const mainElements = ELEMENTS.filter((element) => !element.series);
  const seriesElements = ELEMENTS.filter((element) => element.series);

  return (
    <main className={`${styles.page} ${isSolved ? styles.solved : ""}`}>
      <div className={styles.viewport}>
        <section className={styles.table} aria-label="Periodic table of elements">
          {mainElements.map((element) => (
            <ElementTile
              key={element.atomicNumber}
              element={element}
              selected={selected.has(element.atomicNumber)}
              onSelect={selectElement}
              style={{ gridColumn: element.group, gridRow: element.period }}
            />
          ))}
        </section>

        <section className={styles.series} aria-label="Lanthanides and actinides">
          {(["lanthanide", "actinide"] as ElementSeries[]).map((series) => (
            <div className={styles.seriesRow} key={series}>
              <span className={styles.seriesLabel}>{SERIES_LABELS[series]}</span>
              {seriesElements
                .filter((element) => element.series === series)
                .map((element, index) => (
                  <ElementTile
                    key={element.atomicNumber}
                    element={element}
                    selected={selected.has(element.atomicNumber)}
                    onSelect={selectElement}
                    style={{ gridColumn: index + 4 }}
                  />
                ))}
            </div>
          ))}
        </section>
      </div>

      {isSolved && (
        <div className={styles.reveal} role="status" aria-live="polite">
          <p className={styles.success}>200 OK</p>
        </div>
      )}
    </main>
  );
}