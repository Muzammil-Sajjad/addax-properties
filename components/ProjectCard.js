"use client";

import Link from "next/link";
import Image from "next/image";
import { Price } from "./Currency";
import { IconSpark } from "./Icons";
import { developerBySlug } from "@/lib/data";

export default function ProjectCard({ p, priority = false }) {
  const dev = developerBySlug(p.developerSlug);
  const detail = `/properties/${p.slug}`;
  return (
    <article className="pcard">
      <Link href={detail} className="pcard-media" tabIndex={-1} aria-hidden="true">
        <Image src={p.image} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={priority} />
        <span className="chip chip--dark">{dev ? dev.name : p.developer}</span>
        {p.planShort && <span className="chip chip--light">{p.planShort} Plan</span>}
        <span className="pcard-loc"><IconSpark />{p.location}</span>
      </Link>
      <div className="pcard-body">
        <h3><Link href={detail}>{p.name}</Link></h3>
        <p className="pcard-sub">{p.bedrooms || p.type || p.developer}</p>
        <dl className="pcard-facts">
          <div>
            <dt>Starting price</dt>
            <dd className="price"><Price aed={p.startingPrice} /></dd>
          </div>
          <div className="is-right">
            <dt>Handover</dt>
            <dd className="handover">{p.handover || "TBC"}</dd>
          </div>
        </dl>
        <div className="pcard-actions">
          <Link href={detail} className="btn btn--line btn--sm">View Details</Link>
          {p.brochureHref ? (
            <a href={p.brochureHref} target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--sm">Brochure PDF</a>
          ) : (
            <Link href={`${detail}#enquire`} className="btn btn--dark btn--sm">Request Brochure</Link>
          )}
        </div>
      </div>
    </article>
  );
}
