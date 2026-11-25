import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ProjectsBrowser from "@/components/ProjectsBrowser";
import { properties } from "@/lib/data";
import { withFiles } from "@/lib/files";

export const metadata = {
  title: "Dubai Off-Plan Projects",
  description: "Browse active off-plan launches in Dubai with starting prices, payment plans, handover dates and brochures.",
};

export default function ProjectsPage() {
  const projects = properties.map(withFiles);
  return (
    <>
      <PageHero
        eyebrow="Active inventory only"
        title="Latest Developer"
        accent="Launches"
        text="Every listing is active primary developer stock with its payment plan, handover schedule and, where available, the official brochure and floor plan."
        image="/images/properties/valia/cover.png"
      />
      <section className="section section--tight">
        <div className="wrap">
          <Suspense fallback={<p className="count-line">Loading projects…</p>}>
            <ProjectsBrowser projects={projects} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
