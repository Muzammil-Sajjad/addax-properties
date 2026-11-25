import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import SectionHead from "@/components/SectionHead";
import { developers, developerBySlug, projectsOf } from "@/lib/data";
import { withFiles } from "@/lib/files";

export function generateStaticParams() {
  return developers.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = developerBySlug(slug);
  return d
    ? { title: `${d.full} Off-Plan Launches`, description: `${d.blurb} Browse current ${d.name} projects with prices and payment plans.` }
    : { title: "Developer not found" };
}

export default async function DeveloperPage({ params }) {
  const { slug } = await params;
  const d = developerBySlug(slug);
  if (!d) notFound();
  const list = projectsOf(slug).map(withFiles);

  return (
    <>
      <section className="page-hero page-hero--dev" style={{ "--hero-img": `url(${d.image})` }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/developers">Developers</Link><span>/</span><span aria-current="page">{d.name}</span></nav>
          <Image src={d.logo} alt={`${d.full} logo`} width={220} height={55} className="dev-hero-logo" priority />
          <h1>{d.tagline}</h1>
          <p className="lead">{d.blurb}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={d.focus} title={`${d.full} Launches`} text={`${list.length} active primary releases with payment plans and handover dates.`} />
          <div className="card-grid">{list.map((p, i) => <ProjectCard key={p.slug} p={p} priority={i < 3} />)}</div>
        </div>
      </section>
    </>
  );
}
