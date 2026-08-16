import type { Metadata } from "next";
import "./globals.css";
import CursorTrail from "./components/CursorTrail";

export const metadata: Metadata = {
  title: "The Vertex Puzzle",
  description: "A computer-science digital escape room.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
