import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import HeroSearch from "@/components/HeroSearch";
import LaunchesGrid from "@/components/LaunchesGrid";
import Estimator from "@/components/Estimator";
import LeadForm from "@/components/LeadForm";
import SectionHead from "@/components/SectionHead";
import { IconArrow, IconSpark } from "@/components/Icons";
import { developers, communities, properties, projectsIn } from "@/lib/data";
import { withFiles } from "@/lib/files";

const STATS = [
  ["0%", "Tax on Rental & Capital Gains"],
  ["1% / Mo", "Flexible Developer Plans"],
  ["10-Yr", "UAE Golden Visa Eligibility"],
];

const STANDARD = [
  ["Curated Active Inventory Only", "We feature only live primary releases from Dubai's established developers, with pricing taken directly from developer price lists.", "Direct primary access"],
  ["Transparent Payment Milestones", "Every project page maps out the booking amount, construction-linked instalments and handover payments before you commit.", "DLD escrow protected"],
  ["Overseas Investor Advisory", "Built for buyers purchasing remotely, from unit selection and EOI to SPA signing and Golden Visa guidance.", "Remote EOI & handover"],
];

const FEATURED_CORRIDORS = ["dubai-creek-harbour", "dubai-maritime-city", "al-jaddaf", "downtown-jebel-ali"];

export default function HomePage() {
  const projects = properties.map(withFiles);
  const corridors = FEATURED_CORRIDORS.map((s) => communities.find((c) => c.slug === s));

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <HeroVideo />
        <div className="wrap hero-inner">
          <p className="pill-eyebrow"><span className="dot" />Dubai Primary Market Advisory • {new Date().getFullYear()} Releases</p>
          <h1>Curated Off-Plan Investments in <em>Dubai’s Premier</em> Developments</h1>
          <p className="hero-lead">
            Direct access to flagship launches by <strong>Emaar, Danube, DAMAC, Binghatti, Imtiaz and Azizi</strong>,
            handpicked for capital appreciation, structured payment milestones and high-yield international portfolios.
          </p>
          <ul className="hero-stats">
            {STATS.map(([n, t]) => (<li key={t}><strong>{n}</strong><span>{t}</span></li>))}
          </ul>
        </div>
        <div className="wrap hero-search-wrap">
          <HeroSearch />
        </div>
      </section>

      {/* ===== DEVELOPER STRIP ===== */}
      <section className="dev-strip-sec">
        <div className="wrap">
          <p className="eyebrow center">Curated primary launches from Dubai’s leading master developers</p>
          <ul className="dev-strip">
            {developers.map((d) => (
              <li key={d.slug}>
                <Link href={`/developers/${d.slug}`}>
                  <span className="dev-word">{d.name.toUpperCase()}</span>
                  <span className="dev-focus">{d.focus}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== LATEST LAUNCHES ===== */}
      <section className="section">
        <div className="wrap">
          <LaunchesGrid projects={projects} />
        </div>
      </section>

      {/* ===== CORRIDORS ===== */}
      <section className="section section--sand">
        <div className="wrap">
          <SectionHead eyebrow="High-growth masterplans" title="Anchor Investment Corridors" center />
          <div className="corridors">
            {corridors.map((c, i) => (
              <Link href={`/communities#${c.slug}`} className={`corridor ${i === 0 ? "is-featured" : ""}`} key={c.slug} data-reveal>
                <span className="eyebrow">{c.label}</span>
                <h3>{c.name}</h3>
                <p>{c.text}</p>
                <span className="corridor-count">{projectsIn(c.slug).length} active launches <IconArrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE ADDAX STANDARD ===== */}
      <section className="section section--dark">
        <div className="wrap standard">
          <div className="standard-intro" data-reveal>
            <p className="eyebrow">The Addax Standard</p>
            <h2>Disciplined Curation Over Endless Clutter</h2>
            <p className="standard-lead">
              Rather than overwhelming international buyers with thousands of outdated secondary listings, Addax focuses
              strictly on <em>active developer launches</em> with proven track records, escrow protection and clear exit liquidity.
            </p>
            <Link href="/contact" className="btn btn--gold btn--lg">Speak With an Investment Advisor <IconArrow /></Link>
          </div>
          <div className="standard-cards">
            {STANDARD.map(([t, d, tag], i) => (
              <div className="std-card" key={t} data-reveal>
                <span className="std-no">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="std-tag">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ESTIMATOR ===== */}
      <section className="section">
        <div className="wrap wrap--narrow" data-reveal>
          <Estimator />
        </div>
      </section>

      {/* ===== PRIVATE DESK ===== */}
      <section className="section section--sand" id="private-desk">
        <div className="wrap">
          <div className="desk" data-reveal>
            <div className="desk-copy">
              <p className="eyebrow">Private Desk</p>
              <h2>Receive Priority Access to Upcoming Launches</h2>
              <p>Submit your investment criteria to receive official floor plans, unit availability sheets and launch-day EOI allocations directly from our advisory desk.</p>
              <ul className="ticks">
                <li><IconSpark />Direct developer price lists &amp; payment schedules</li>
                <li><IconSpark />Net rental yield &amp; capital growth projections</li>
                <li><IconSpark />Zero buyer commission on off-plan purchases</li>
              </ul>
            </div>
            <div className="desk-form">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
