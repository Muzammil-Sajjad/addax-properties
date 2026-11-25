// Server-only helpers: link a brochure / floor plan only when the PDF really exists in /public.
import fs from "node:fs";
import path from "node:path";

const exists = (url) => {
  if (!url) return false;
  if (/^https?:\/\//i.test(url)) return true;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", url.replace(/^\//, "")));
  } catch {
    return false;
  }
};
const pick = (given, auto) => (exists(given) ? given : exists(auto) ? auto : "");

export function withFiles(p) {
  return {
    ...p,
    brochureHref: pick(p.brochure, `/brochures/${p.slug}.pdf`),
    floorPlanHref: pick(p.floorPlan, `/floorplans/${p.slug}.pdf`),
  };
}
