// Central content file. Edit text, contact details, developers and communities here.
// Projects live in lib/projects.js.
import { rows } from "./projects";

export const site = {
  name: "Addax Properties",
  short: "Addax",
  sub: "Dubai Real Estate",
  tagline: "Curated off-plan investments in Dubai's premier developments.",
  phone: "+971 4 555 0194",
  email: "advisory@addaxproperties.com", // e.g. "advisory@addaxproperties.com 03237907679" (hidden while empty)
  address: "UAE",
  hours: "9:00 AM – 8:00 PM GST",
  whatsappNumber: "", // digits only with country code, e.g. 923001234567
  social: {
    instagram: "https://www.instagram.com/addaxproperties/",
    facebook: "https://www.facebook.com/people/Addax-Properties/61596137160883/",
    linkedin: "https://www.linkedin.com/company/addax-properties/about/",
  },
};

export const whatsappHref = site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}` : "/contact";
export const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

// Indicative exchange rates: how many AED one unit of each currency buys.
// AED is pegged to USD at 3.6725. Update GBP from time to time.
export const currencies = {
  AED: { rate: 1, symbol: "AED" },
  USD: { rate: 3.6725, symbol: "USD" },
  GBP: { rate: 4.65, symbol: "GBP" },
};

export const GOLDEN_VISA_AED = 2000000;

export const navLinks = [
  { href: "/properties", label: "Projects" },
  { href: "/developers", label: "Developers", dropdown: true },
  { href: "/communities", label: "Communities" },
  { href: "/calculator", label: "ROI & Payment Calculator" },
  { href: "/advisory", label: "Advisory" },
];

export const footerLegal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
  // { href: "/investment-disclaimer", label: "Investment Disclaimer" },
];

// image = tile photo, logo = white logo (for dark backgrounds)
export const developers = [
  {
    slug: "emaar",
    name: "Emaar",
    full: "Emaar Properties",
    focus: "Master Communities & Capital Growth",
    tagline: "Iconic Communities. Exceptional Addresses.",
    blurb: "Discover thoughtfully planned communities and contemporary residences by Emaar Properties, the developer behind many of Dubai's best-known master communities.",
  },
  {
    slug: "danube",
    name: "Danube",
    full: "Danube Properties",
    focus: "Flexible 1% Monthly Payment Plans",
    tagline: "Contemporary Living. Flexible Possibilities.",
    blurb: "Explore residential developments known for contemporary design, lifestyle amenities and project-specific payment structures.",
  },
  {
    slug: "binghatti",
    name: "Binghatti",
    full: "Binghatti",
    focus: "Statement Architecture",
    tagline: "Architecture That Makes a Statement.",
    blurb: "Explore distinctive modern architecture, contemporary apartments and selected branded residences.",
  },
  {
    slug: "damac",
    name: "DAMAC",
    full: "DAMAC Properties",
    focus: "Luxury Communities & Villas",
    tagline: "Luxury Living, Reimagined.",
    blurb: "Explore residential communities and luxury developments featuring distinctive homes and lifestyle amenities.",
  },
  {
    slug: "imtiaz",
    name: "Imtiaz",
    full: "Imtiaz Developments",
    focus: "Design-Led Boutique Residences",
    tagline: "Designed for Elevated Everyday Living.",
    blurb: "Discover thoughtfully designed residences with modern interiors and contemporary architecture.",
  },
  {
    slug: "azizi",
    name: "Azizi",
    full: "Azizi Developments",
    focus: "Accessible Entry Prices",
    tagline: "Communities Built Around Possibility.",
    blurb: "Explore apartments, waterfront residences and master-planned developments across Dubai.",
  },
].map((d) => ({
  ...d,
  image: `/images/developers/${d.slug}.png`,
  logo: `/images/developers-logo/${d.slug}.png`,
}));

// Communities ("investment corridors"). `locations` lists the project locations that belong to each.
export const communities = [
  {
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    label: "Emaar Masterplan",
    text: "Waterfront skyline district minutes from Downtown Dubai, with a long pipeline of new off-plan releases.",
    locations: ["Dubai Creek Harbour"],
  },
  {
    slug: "dubai-maritime-city",
    name: "Dubai Maritime City",
    label: "Sea-View Peninsula",
    text: "Peninsula towers with sea views between Port Rashid and Dubai Drydocks, close to Downtown and Old Dubai.",
    locations: ["Dubai Maritime City"],
  },
  {
    slug: "al-jaddaf",
    name: "Al Jaddaf",
    label: "Creekside Corridor",
    text: "A fast-growing creekside district beside Dubai Healthcare City, home to several statement towers.",
    locations: ["Al Jaddaf", "Al Jaddaf / Dubai Healthcare City"],
  },
  {
    slug: "downtown-jebel-ali",
    name: "Downtown Jebel Ali",
    label: "Southern Growth Corridor",
    text: "Metro-connected district near Expo City and Al Maktoum airport, with accessible entry prices.",
    locations: ["Downtown Jebel Ali"],
  },
  {
    slug: "rashid-yachts-marina",
    name: "Rashid Yachts & Marina",
    label: "Waterfront Living",
    text: "Marina residences at Mina Rashid, a historic port reimagined as a waterfront lifestyle destination.",
    locations: ["Rashid Yachts & Marina"],
  },
  {
    slug: "emaar-south",
    name: "Emaar South",
    label: "Golf Community",
    text: "A golf-course community next to Expo City and Al Maktoum International Airport.",
    locations: ["Emaar South"],
  },
  {
    slug: "damac-hills",
    name: "DAMAC Hills & Dubailand",
    label: "Villa Communities",
    text: "Established and upcoming DAMAC communities with villas, townhouses and resort-style amenities.",
    locations: ["DAMAC Hills", "Damac Hills 1", "Dubailand"],
  },
  {
    slug: "dubai-land-residence-complex",
    name: "Dubai Land Residence Complex",
    label: "Value Corridor",
    text: "A residential district along Al Qudra Road offering some of the city's most accessible off-plan prices.",
    locations: ["Dubai Land Residence Complex"],
  },
  {
    slug: "jvc-academic-city",
    name: "JVC & Academic City",
    label: "High-Demand Rentals",
    text: "Family-friendly communities with steady rental demand from residents and students.",
    locations: ["Jumeirah Village Circle", "Dubai Academic City"],
  },
];

/* ---------- projects ---------- */
const TBC = "To be confirmed";
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// "10% booking / 70% construction / 20% handover" -> [{pct:10,label:"Booking"}, ...]
export function parsePlan(text) {
  const out = [];
  const re = /(\d+(?:\.\d+)?)\s*%\s*([^/,;\d]*)/g;
  let m;
  while ((m = re.exec(text || ""))) {
    let label = m[2].trim().replace(/^(during|on|at|in|upon)\s+/i, "").trim();
    label = label ? label[0].toUpperCase() + label.slice(1) : "Payment";
    out.push({ pct: parseFloat(m[1]), label });
  }
  const sum = out.reduce((a, s) => a + s.pct, 0);
  return out.length >= 2 && Math.abs(sum - 100) < 1 ? out : [];
}

const communityOf = (location) => communities.find((c) => c.locations.includes(location));

export const properties = rows.map((p) => {
  const slug = p.slug || slugify(p.name);
  const steps = parsePlan(p.paymentPlan);
  const c = communityOf(p.location);
  return {
    ...p,
    slug,
    steps,
    planShort: steps.length ? steps.map((s) => s.pct).join("/") : "",
    community: c ? c.slug : "",
    type: p.type || "",
    bedrooms: p.bedrooms || "",
    status: p.status || "",
    lastVerified: p.lastVerified || null,
  };
});

export const developerBySlug = (slug) => developers.find((d) => d.slug === slug);
export const projectsOf = (devSlug) => properties.filter((p) => p.developerSlug === devSlug);
export const projectsIn = (commSlug) => properties.filter((p) => p.community === commSlug);
export const TBC_TEXT = TBC;

export const budgets = [
  { value: "0-800000", label: "Under AED 800K" },
  { value: "800000-1500000", label: "AED 800K – 1.5M" },
  { value: "1500000-2000000", label: "AED 1.5M – 2M" },
  { value: "2000000-", label: "AED 2M+ (Golden Visa range)" },
];

/* ---------- advisory content ---------- */
export const services = [
  ["Investment Consultation", "We start with your goals, budget and timeline, then shortlist launches that genuinely fit."],
  ["Project Comparison", "Side-by-side view of price, location, payment plan, handover and developer track record."],
  ["Payment Plan Structuring", "Clear schedules for booking, construction-linked instalments and post-handover plans."],
  ["Remote Purchase Support", "From unit selection and EOI to SPA signing, handled remotely by WhatsApp or video call."],
  ["Golden Visa Guidance", "Understand how qualifying purchases of AED 2M+ may support a 10-year UAE residence application."],
  ["Handover & Leasing", "Snagging, handover and introductions to leasing partners once your unit completes."],
];

export const steps = [
  ["Share your goals", "Tell us your budget, preferred areas and whether you're buying to live, rent or resell."],
  ["Review curated launches", "Receive a shortlist with floor plans, price lists and payment schedules."],
  ["Reserve your unit", "Secure the unit with an EOI or booking payment, guided step by step."],
  ["Sign & track progress", "Sign the SPA, pay milestones into the project escrow account and follow construction to handover."],
];

export const faqs = [
  ["Can Pakistani citizens buy property in Dubai?", "Generally yes, in designated freehold areas and subject to current UAE ownership and transaction rules."],
  ["Can I buy without travelling to Dubai?", "Yes. Research, reservation and most of the paperwork can be done remotely. Some steps may need documents to be signed or attested."],
  ["What is an off-plan property?", "A unit sold before construction is complete, usually with a payment plan linked to construction milestones and a projected handover date."],
  ["Which extra costs should I plan for?", "Dubai Land Department fee (4% of the price), registration and admin fees, service charges and, if used, financing costs."],
  ["Does buying property qualify for a Golden Visa?", "Property worth AED 2M or more may support a 10-year UAE Golden Visa application, subject to current rules and official approval."],
  ["Is there tax on rental income or capital gains?", "The UAE currently charges no personal income tax on rent or capital gains for individuals. Tax in your home country may still apply."],
  ["How do I send payments from Pakistan?", "Payments must follow Pakistani banking and foreign-exchange rules. Confirm the permitted route with your bank."],
  ["Does Addax guarantee returns?", "No. Property values, rents and completion dates can change, and every investment carries risk."],
];
