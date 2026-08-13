"use client";

export default function PuzzlePhoto() {
  const handleReveal = () => {
    window.history.replaceState({}, "", "/?EXIF=on");
  };

  const imageUrl = "/observation-photo.jpg";

  return (
    <section className="photo-stage" aria-label="Puzzle photograph">
      <img className="puzzle-photo" src={imageUrl} alt="" />

      <button
        type="button"
        className="peak-hitbox"
        aria-label="Inspect peak"
        onMouseEnter={handleReveal}
        onFocus={handleReveal}
        onClick={handleReveal}
      />
    </section>
  );
}
