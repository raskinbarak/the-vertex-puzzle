import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import CursorTrail from "./components/CursorTrail";

export const metadata: Metadata = {
  title: "the-vertex-puzzle",
  description: "A computer-science digital escape room",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
