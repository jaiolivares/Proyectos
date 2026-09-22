export function normalizeText(value?: string): string {
  return (value ?? "").trim();
}

export function stripDiacritics(value?: string): string {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[0-\u036f]/g, "")
    .toLowerCase();
}

export function includesNormalized(haystack?: string, needle?: string): boolean {
  const h = (haystack ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const n = (needle ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return h.includes(n);
}
