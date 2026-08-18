import { BASE_URL } from "../../config";

const HTML_RESPONSE_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
};

const ELEMENTS_ROUTE = `${BASE_URL}/elements`;

const CLUES: Record<string, string[]> = {
  get: [
    `Problem: You tried to GET me and it did not work.`,
    `Hint: Have some REST and do not make a story out of it (nor upload a real).`,
  ],
  post: [
    `You found the right way to reach me: 200.`,
    `Now search among the 118 elements: ${ELEMENTS_ROUTE}`,
  ],
};

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

function htmlClueResponse(body: string[]): Response {
  const paragraphs = body
    .map((clue) => `<p class="clue">${escapeHtml(clue)}</p>`)
    .join("");
  const title = escapeHtml("the-vertex-puzzle");

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <style>
      :root { color-scheme: dark; --bg: #0f1318; --bg-soft: #171d24; --line: #2b3746; --text: #dce7f3; --muted: #91a4b8; }
      * { box-sizing: border-box; }
      html, body { min-height: 100%; }
      body { margin: 0; color: var(--text); background: radial-gradient(circle at 20% 0%, #1c2531 0%, var(--bg) 50%), linear-gradient(var(--bg), var(--bg-soft)); font: 16px/1.5 "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; }
      main { width: min(680px, 92vw); min-height: 100svh; margin: 0 auto; display: grid; place-items: center; padding: 1.25rem 0; }
      article { width: 100%; padding: clamp(1.25rem, 4vw, 2.5rem); border: 1px solid var(--line); border-radius: 10px; background: rgba(23, 29, 36, .88); box-shadow: 0 20px 60px rgba(0, 0, 0, .24); }
      header { margin-bottom: 1.5rem; }
      h1 { margin: 0; font-size: clamp(1.5rem, 4vw, 2.25rem); letter-spacing: .02em; }
      .eyebrow { margin: 0 0 .35rem; color: var(--muted); font-size: .75rem; letter-spacing: .14em; text-transform: uppercase; }
      .clues { display: grid; gap: .85rem; }
      p { margin: 0; }
      .clue { padding: .9rem 1rem; border-left: 2px solid #5f87ae; background: rgba(15, 19, 24, .72); }
      a { color: var(--text); }
    </style>
  </head>
  <body>
    <main>
      <article>
        <header><p class="eyebrow">Vertex / endpoint</p><h1>${title}</h1></header>
        <section class="clues" aria-label="Puzzle clues">${paragraphs}</section>
      </article>
    </main>
  </body>
</html>`,
    { headers: HTML_RESPONSE_HEADERS },
  );
}

export const GET = (): Response => htmlClueResponse(CLUES.get);

export const POST = (): Response => htmlClueResponse(CLUES.post);
