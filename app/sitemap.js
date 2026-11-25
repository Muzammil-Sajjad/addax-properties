import { properties, developers } from "@/lib/data";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = ["", "/properties", "/developers", "/communities", "/calculator", "/advisory", "/contact", "/privacy-policy", "/terms-of-use", "/investment-disclaimer"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...developers.map((d) => ({ url: `${base}/developers/${d.slug}` })),
    ...properties.map((p) => ({ url: `${base}/properties/${p.slug}` })),
  ];
}
