/** Helpers for editing list fields as multi-line text in admin forms. */

export const linesToArray = (text: string): string[] =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const arrayToLines = (arr: string[] | undefined): string =>
  (arr ?? []).join("\n");

/** Results edited as "label | value" per line. */
export function linesToResults(text: string): { label: string; value: string }[] {
  return linesToArray(text).map((line) => {
    const [label, ...rest] = line.split("|");
    return { label: label.trim(), value: rest.join("|").trim() };
  });
}

export function resultsToLines(
  results: { label: string; value: string }[] | undefined,
): string {
  return (results ?? []).map((r) => `${r.label} | ${r.value}`).join("\n");
}
