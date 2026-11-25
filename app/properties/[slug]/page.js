import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import Estimator from "@/components/Estimator";
import ProjectCard from "@/components/ProjectCard";
import SectionHead from "@/components/SectionHead";
import { Price } from "@/components/Currency";
import { IconPin, IconDoc, IconWhatsApp } from "@/components/Icons";
import { properties, developerBySlug, communities, whatsappHref, GOLDEN_VISA_AED } from "@/lib/data";
import { withFiles } from "@/lib/files";

const find = (slug) => properties.find((x) => x.slug === slug);

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.name} by ${p.developer}`,
    description: `${p.name} by ${p.developer} in ${p.location}, Dubai. Starting price, ${p.planShort || "payment"} plan, ${p.handover || ""} handover, brochure and floor plan.`,
    openGraph: { images: [p.image] },
  };
}

function mapFor(p) {
  const q = encodeURIComponent([p.name, p.location, "Dubai"].filter(Boolean).join(", "));
  const given = (/src=["']([^"']+)["']/i.exec(p.mapUrl || "") || [])[1] || p.mapUrl || "";
  const embed = /\/maps\/embed|output=embed/i.test(given) ? given : `https://www.google.com/maps?q=${q}&output=embed`;
  return { embed, link: p.mapLink || `https://www.google.com/maps/search/?api=1&query=${q}` };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const raw = find(slug);
  if (!raw) notFound();
  const p = withFiles(raw);
  const dev = developerBySlug(p.developerSlug);
  const community = communities.find((c) => c.slug === p.community);
  const map = mapFor(p);
  const related = properties
    .filter((x) => x.slug !== p.slug && (x.developerSlug === p.developerSlug || (p.community && x.community === p.community)))
    .slice(0, 3)
    .map(withFiles);

  return (
    <div className="project">
      {/* ===== HERO ===== */}
      <section className="proj-hero">
        <Image src={p.image} alt={`${p.name} by ${p.developer}`} fill priority sizes="100vw" className="proj-hero-img" />
        <div className="proj-hero-shade" />
        <div className="wrap proj-hero-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/properties">Projects</Link><span>/</span>
            <Link href={`/developers/${p.developerSlug}`}>{dev?.name || p.developer}</Link><span>/</span>
            <span aria-current="page">{p.name}</span>
          </nav>
          <span className="chip chip--gold">{p.developer}</span>
          <h1>{p.name}</h1>
          <p className="proj-loc"><IconPin />{p.location}, Dubai</p>
          <div className="btn-row">
            {p.brochureHref
              ? <a href={p.brochureHref} target="_blank" rel="noopener noreferrer" className="btn btn--gold">View Brochure</a>
              : <a href="#enquire" className="btn btn--gold">Request Brochure</a>}
            {p.floorPlanHref
              ? <a href={p.floorPlanHref} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">View Floor Plan</a>
              : <a href="#enquire" className="btn btn--ghost">Request Floor Plan</a>}
          </div>
        </div>
      </section>

      {/* ===== KEY FACTS ===== */}
      <div className="wrap facts-wrap">
        <dl className="facts">
          <div>
            <dt>Starting price</dt>
            <dd className="facts-price"><Price aed={p.startingPrice} /></dd>
            {p.priceNote && <p className="facts-note">{p.priceNote}</p>}
          </div>
          <div><dt>Handover</dt><dd>{p.handover || "To be confirmed"}</dd></div>
          <div><dt>Payment plan</dt><dd>{p.planShort || "On request"}</dd></div>
          <div>
            <dt>Golden Visa</dt>
            <dd className="facts-small">{p.startingPrice >= GOLDEN_VISA_AED ? "Eligible from entry price" : "Eligible on units AED 2M+"}</dd>
          </div>
        </dl>
        <p className="facts-verified">{p.lastVerified ? `Last verified ${p.lastVerified}. ` : ""}Prices and availability may change.</p>
      </div>

      {/* ===== OVERVIEW + MILESTONES ===== */}
      <section className="section">
        <div className="wrap proj-overview">
          <div data-reveal>
            <p className="eyebrow">Project overview</p>
            <h2>{p.name} at {p.location}</h2>
            <p className="sec-text">
              {p.overview ||
                `${p.name} is a new launch by ${p.developer} in ${p.location}${community ? `, part of the ${community.name} corridor. ${community.text}` : "."} Request the latest price list and available units from our advisory desk.`}
            </p>
            <ul className="spec-list">
              <li><span>Developer</span><strong>{p.developer}</strong></li>
              <li><span>Community</span><strong>{p.location}</strong></li>
              {p.bedrooms && <li><span>Units</span><strong>{p.bedrooms}</strong></li>}
              {p.type && <li><span>Type</span><strong>{p.type}</strong></li>}
              <li><span>Handover</span><strong>{p.handover || "TBC"}</strong></li>
            </ul>
          </div>
          {p.steps.length > 0 && (
            <div className="milestones" data-reveal>
              <p className="eyebrow">Payment milestones</p>
              <div className="ms-bar" aria-hidden="true">
                {p.steps.map((s) => <span key={s.label} style={{ flexGrow: s.pct }} />)}
              </div>
              <ol>
                {p.steps.map((s, i) => (
                  <li key={s.label}>
                    <span className="ms-no">0{i + 1}</span>
                    <div><strong>{s.label}</strong>{p.startingPrice ? <span>From <Price aed={(p.startingPrice * s.pct) / 100} /></span> : null}</div>
                    <em>{s.pct}%</em>
                  </li>
                ))}
              </ol>
              <p className="fine">Amounts use the starting price. Your unit’s schedule depends on its final price.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== ESTIMATOR ===== */}
      <section className="section section--sand">
        <div className="wrap wrap--narrow">
          <Estimator initialPrice={p.startingPrice || 2000000} projectPlan={p.steps} projectName={p.name} compact />
        </div>
      </section>

      {/* ===== LOCATION + DOCUMENTS ===== */}
      <section className="section">
        <div className="wrap loc-docs">
          <div data-reveal>
            <p className="eyebrow">Location</p>
            <h2>{p.location}</h2>
            <div className="map-frame">
              <iframe src={map.embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" title={`${p.name} location map`} />
            </div>
            <a href={map.link} target="_blank" rel="noopener noreferrer" className="btn btn--line btn--sm mt">Open in Google Maps</a>
          </div>
          <div className="docs" data-reveal>
            <p className="eyebrow">Documents</p>
            <h2>Brochure &amp; Floor Plans</h2>
            {[
              ["Project Brochure", `Official details and specifications for ${p.name}.`, p.brochureHref, "Brochure"],
              ["Floor Plans", "Unit layouts and sizes for the available configurations.", p.floorPlanHref, "Floor Plan"],
            ].map(([t, d, href, word]) => (
              <div className="doc" key={t}>
                <IconDoc />
                <div><h3>{t}</h3><p>{d}</p></div>
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--sm">View PDF</a>
                  : <a href="#enquire" className="btn btn--line btn--sm">Request {word}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENQUIRE ===== */}
      <section className="section section--sand" id="enquire">
        <div className="wrap">
          <div className="desk">
            <div className="desk-copy">
              <p className="eyebrow">Private desk</p>
              <h2>Interested in {p.name}?</h2>
              <p>Get the latest price list, available units, floor plans and the full payment schedule from our advisory desk.</p>
              <div className="btn-row">
                <a href={whatsappHref} className="btn btn--line" target={whatsappHref.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"><IconWhatsApp /> Chat on WhatsApp</a>
              </div>
            </div>
            <div className="desk-form">
              <LeadForm project={p.name} cta="Request Latest Pricing" />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead eyebrow="You may also like" title="Similar Launches" />
            <div className="card-grid">{related.map((r) => <ProjectCard key={r.slug} p={r} />)}</div>
          </div>
        </section>
      )}

      {/* ===== MOBILE BAR ===== */}
      <div className="mobile-cta">
        <div><small>Starting from</small><strong><Price aed={p.startingPrice} /></strong></div>
        <a href="#enquire" className="btn btn--gold btn--sm">Enquire</a>
      </div>
    </div>
  );
}
