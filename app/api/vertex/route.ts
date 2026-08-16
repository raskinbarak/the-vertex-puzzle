const TEXT_RESPONSE_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
};

const CLUES = {
  get: "Problem:\nYou tried to GET me and it did not work.\n\nHint:\nDo not make a story out of it, nor upload a real.",
  post: "You found the right way to reach me.\n\nThe next clue is hidden among the elements.",
} as const;

function clueResponse(body: string): Response {
  return new Response(body, {
    headers: TEXT_RESPONSE_HEADERS,
  });
}

export const GET = (): Response => clueResponse(CLUES.get);

export const POST = (): Response => clueResponse(CLUES.post);
