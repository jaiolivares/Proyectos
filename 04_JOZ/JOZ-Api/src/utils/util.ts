export function NormalizaBody(obj: any): void {

  //Elimina espacios en blanco al inicio y al final de las cadenas en un objeto
  if (!obj || typeof obj !== "object") return;

  const isExplicitIso = (s: string) => {
    if (!s) return false;
    const n = s.trim();
    // ISO-like: starts with yyyy- or contains a T (date-time) or timezone/Z or includes hours
    return /^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/.test(n) || /T|Z|:\d{2}/.test(n);
  };

  const tryParseDate = (s: string): Date | null => {
    if (!s || typeof s !== "string") return null;
    const str = s.trim();

    // If clearly ISO or contains time info, let native parser handle it
    if (isExplicitIso(str)) {
      const d = new Date(str);
      if (!Number.isNaN(d.getTime())) return d;
    }

    // Normalize separators to '-'
    const norm = str.replace(/[\/\.]/g, "-").replace(/\s+/g, "");
    const parts = norm.split("-");
    if (parts.length < 3) return null;

    let year: number, month: number, day: number;

    // If first part has 4 digits assume year-first (yyyy-mm-dd)
    if (/^\d{4}$/.test(parts[0])) {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else {
      // Prefer day-month-year for ambiguous non-ISO formats (dd-mm-yyyy or d-m-yyyy)
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
      // If year is two digits, normalize (e.g., 87 -> 1987)
      if (year < 100) year += year >= 70 ? 1900 : 2000;
    }

    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;

    // Create date in UTC to avoid timezone shifts, then validate components
    const dt = new Date(Date.UTC(year, month - 1, day));
    if (dt.getUTCFullYear() === year && dt.getUTCMonth() === month - 1 && dt.getUTCDate() === day) {
      return dt;
    }
    return null;
  };

  const recurse = (o: any) => {
    if (o === null) return;
    if (Array.isArray(o)) {
      for (let i = 0; i < o.length; i++) {
        const v = o[i];
        if (typeof v === "string") {
          const parsed = tryParseDate(v);
          o[i] = parsed ? parsed : v.trim();
        } else if (typeof v === "object") {
          recurse(v);
        }
      }
      return;
    }

    Object.keys(o).forEach((k) => {
      const v = o[k];
      if (typeof v === "string") {
        const trimmed = v.trim();
        const parsed = tryParseDate(trimmed);
        o[k] = parsed ? parsed : trimmed;
      } else if (typeof v === "object") {
        recurse(v);
      }
    });
  };

  recurse(obj);

}
