import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import { site, developers, communities, footerLegal, telHref } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-about">
          <Link href="/" aria-label={`${site.name} home`}>
            <Image src="/images/logo.png" alt={site.name} width={220} height={86} className="footer-logo" />
          </Link>
          <p>Boutique real estate advisory specializing in curated off-plan developments across Dubai's premier master communities.</p>
          <SocialLinks />
        </div>
        <div>
          <p className="footer-head">Featured Developers</p>
          <ul className="footer-list">
            {developers.map((d) => (
              <li key={d.slug}><Link href={`/developers/${d.slug}`}>{d.full} Launches</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-head">Key Corridors</p>
          <ul className="footer-list">
            {communities.slice(0, 6).map((c) => (
              <li key={c.slug}><Link href={`/communities#${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-head">International Desk</p>
          <ul className="footer-list">
            {site.email && <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>}
            <li>Client Desk: <a href={telHref}>{site.phone}</a></li>
            <li>Office: {site.address}</li>
            <li>Hours: {site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <ul className="footer-legal">
          {footerLegal.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}
        </ul>
        <p className="footer-note">Prices and handover quarters are indicative of developer primary releases and subject to unit availability.</p>
      </div>
    </footer>
  );
}
