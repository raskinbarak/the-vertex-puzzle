import { redirect } from "next/navigation";
import PuzzlePhoto from "./PuzzlePhoto";

type HomeProps = {
  searchParams?: Promise<{
    EXIF?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  if (params?.EXIF !== "on") redirect("/?EXIF=on");

  return (
    <main className="puzzle-shell">
      <PuzzlePhoto />
    </main>
  );
}
