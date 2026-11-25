"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import SectionHead from "./SectionHead";
import { developers } from "@/lib/data";

// Home page "Latest Developer Launches" with developer pills.
export default function LaunchesGrid({ projects, limit = 6 }) {
  const [dev, setDev] = useState("");
  const all = dev ? projects.filter((p) => p.developerSlug === dev) : projects;
  // Without a filter, lead with one launch per developer, then the rest.
  const lead = dev ? [] : developers.map((d) => all.find((p) => p.developerSlug === d.slug)).filter(Boolean);
  const ordered = [...lead, ...all.filter((p) => !lead.includes(p))];
  const shown = ordered.slice(0, limit);

  return (
    <>
      <SectionHead
        eyebrow="Active inventory only"
        title="Latest Developer Launches"
        text="Every listing below is active primary developer stock with its payment plan, handover schedule and, where available, the official brochure."
      >
        <div className="pills" role="group" aria-label="Filter by developer">
          <button type="button" className={!dev ? "is-on" : ""} aria-pressed={!dev} onClick={() => setDev("")}>All Projects</button>
          {developers.map((d) => (
            <button type="button" key={d.slug} className={dev === d.slug ? "is-on" : ""} aria-pressed={dev === d.slug} onClick={() => setDev(d.slug)}>
              {d.name}
            </button>
          ))}
        </div>
      </SectionHead>
      <p className="count-line">Showing {shown.length} of {all.length} curated active launches</p>
      <div className="card-grid">
        {shown.map((p, i) => <ProjectCard key={p.slug} p={p} priority={i < 3} />)}
      </div>
      <div className="center mt-lg">
        <Link href={dev ? `/properties?developer=${dev}` : "/properties"} className="btn btn--line">View all {all.length} projects</Link>
      </div>
    </>
  );
}
