import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { IconArrow } from "@/components/Icons";
import { developers, projectsOf } from "@/lib/data";

export const metadata = {
  title: "Dubai Developers",
  description: "Explore off-plan launches by Emaar, Danube, Binghatti, DAMAC, Imtiaz and Azizi.",
};

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner developers"
        title="Dubai’s Leading"
        accent="Master Developers"
        text="Explore current primary launches from six established names in Dubai real estate. These descriptions are not claims of authorized agency or partnership status."
        image="/images/developers/emaar.png"
      />
      <section className="section">
        <div className="wrap dev-grid">
          {developers.map((d) => {
            const list = projectsOf(d.slug);
            const from = Math.min(...list.map((p) => p.startingPrice).filter(Boolean));
            return (
              <Link href={`/developers/${d.slug}`} className="dev-card" key={d.slug} data-reveal>
                <div className="dev-card-media">
                  <Image src={d.image} alt={`${d.name} developments`} fill sizes="(max-width: 720px) 100vw, 50vw" />
                  <Image src={d.logo} alt={`${d.name} logo`} width={160} height={40} className="dev-card-logo" />
                </div>
                <div className="dev-card-body">
                  <p className="eyebrow">{d.focus}</p>
                  <h2>{d.full}</h2>
                  <p>{d.blurb}</p>
                  <div className="dev-card-foot">
                    <span>{list.length} active launches{Number.isFinite(from) ? ` · from AED ${(from / 1e6).toFixed(2)}M` : ""}</span>
                    <span className="arrow"><IconArrow /></span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
