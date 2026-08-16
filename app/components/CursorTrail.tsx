"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorTrail.module.css";

const DOTS = 8;
const SPARKS = 20;

export default function CursorTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const dots = Array.from(layer.querySelectorAll<HTMLSpanElement>("[data-cursor-dot]"));
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const points = dots.map(() => ({ x, y }));
    let rafId = 0;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };

    const emitSparkBurst = (sparkX: number, sparkY: number) => {
      for (let i = 0; i < SPARKS; i += 1) {
        const spark = document.createElement("span");
        spark.className = styles.spark;
        spark.style.left = `${sparkX}px`;
        spark.style.top = `${sparkY}px`;

        const angle = (Math.PI * 2 * i) / SPARKS + Math.random() * 0.35;
        const distance = 20 + Math.random() * 34;
        spark.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
        spark.style.setProperty("--spark-y", `${Math.sin(angle) * distance}px`);

        layer.appendChild(spark);
        spark.addEventListener("animationend", () => spark.remove(), { once: true });
      }
    };

    const peakHint = (event: Event) => {
      const detail = (event as CustomEvent<{ x?: number; y?: number }>).detail;
      emitSparkBurst(detail?.x ?? x, detail?.y ?? y);
      window.setTimeout(() => {
        emitSparkBurst(detail?.x ?? x, detail?.y ?? y);
      }, 95);
    };

    const frame = () => {
      points[0].x += (x - points[0].x) * 0.35;
      points[0].y += (y - points[0].y) * 0.35;

      for (let i = 1; i < points.length; i += 1) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.4;
        points[i].y += (points[i - 1].y - points[i].y) * 0.4;
      }

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        const scale = 1 - i / (DOTS + 2);
        dot.style.transform = `translate(${points[i].x}px, ${points[i].y}px) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = window.requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("vertex:peak-hint", peakHint);
    frame();

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("vertex:peak-hint", peakHint);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={layerRef} className={styles.layer} aria-hidden="true">
      {Array.from({ length: DOTS }).map((_, i) => (
        <span
          key={i}
          data-cursor-dot
          className={styles.dot}
          style={{
            background: `hsla(${200 + i * 6}, 100%, ${72 - i * 2}%, 0.9)`,
          }}
        />
      ))}
    </div>
  );
}
