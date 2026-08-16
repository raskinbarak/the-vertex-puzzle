import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Vertex Puzzle",
  description: "A computer-science digital escape room.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
