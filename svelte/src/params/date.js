// Only `YYYY-MM-DD` reaches /calendar/[date]; anything else 404s before the
// Sanity fetches run or an ISR cache entry is written.
export const match = (param) => /^\d{4}-\d{2}-\d{2}$/.test(param);
