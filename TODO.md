# TODO / Refactoring Plan

- [ ] Save `/generate-commit` skill globally and rename it to `/commit`.
- [ ] Add constants for all event listener types to avoid magic strings (e.g., `pointermove`, `vertex:peak-hint`).
- [ ] Update the hover spark effect in `#sym:handleFocus` to apply to the entire area of the peak rather than just the borders.
- [ ] Create the simplest configuration file from `.env`.
- [ ] Use the `BASE_URL` configuration constant for hints (`BASE_URL/elements`, `BASE_URL/API/VERTEX`).
