/** Public files from `/public` with Vite `base` (e.g. `/artheatingncooling/`). */
export const publicAsset = (path: string): string => {
  const trimmed = path.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL;
  return `${base}${trimmed}`;
};