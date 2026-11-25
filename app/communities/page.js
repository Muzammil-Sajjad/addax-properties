import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Price } from "@/components/Currency";
import { communities, projectsIn } from "@/lib/data";

export const metadata = {
  title: "Dubai Communities & Investment Corridors",
  description: "Dubai Creek Harbour, Dubai Maritime City, Al Jaddaf, Downtown Jebel Ali and more: the communities behind our curated off-plan launches.",
};

export default function CommunitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="High-growth masterplans"
        title="Anchor Investment"
        accent="Corridors"
        text="The communities where today’s primary launches are concentrated, from waterfront districts to value-led growth corridors."
        image="/images/properties/fior-1/cover.png"
      />
      <section className="section">
        <div className="wrap comm-list">
          {communities.map((c) => {
            const list = projectsIn(c.slug);
            if (!list.length) return null;
            return (
              <article className="comm" id={c.slug} key={c.slug} data-reveal>
                <div className="comm-media">
                  <Image src={list[0].image} alt={`${c.name}, Dubai`} fill sizes="(max-width: 900px) 100vw, 40vw" />
                </div>
                <div className="comm-body">
                  <p className="eyebrow">{c.label}</p>
                  <h2>{c.name}</h2>
                  <p>{c.text}</p>
                  <ul className="comm-projects">
                    {list.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/properties/${p.slug}`}>
                          <span><strong>{p.name}</strong><small>{p.developer} · Handover {p.handover}</small></span>
                          <span className="comm-price"><Price aed={p.startingPrice} compact /></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/properties?community=${c.slug}`} className="btn btn--line btn--sm">View {list.length} launch{list.length > 1 ? "es" : ""}</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
