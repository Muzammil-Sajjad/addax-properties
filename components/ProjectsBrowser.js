"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";
import { developers, communities, budgets } from "@/lib/data";

const year = (h) => (/(\d{4})/.exec(h || "") || [])[1] || "";
const inBudget = (price, range) => {
  if (!range) return true;
  if (!price) return false;
  const [lo, hi] = range.split("-").map((x) => (x ? +x : null));
  return (lo == null || price >= lo) && (hi == null || price < hi);
};

export default function ProjectsBrowser({ projects }) {
  const params = useSearchParams();
  const [f, setF] = useState(() => ({
    developer: params.get("developer") || "",
    community: params.get("community") || "",
    type: params.get("type") || "",
    budget: params.get("budget") || "",
    handover: params.get("handover") || "",
    sort: "featured",
  }));
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const years = useMemo(() => [...new Set(projects.map((p) => year(p.handover)).filter(Boolean))].sort(), [projects]);
  const types = useMemo(() => [...new Set(projects.map((p) => p.type).filter(Boolean))], [projects]);

  let list = projects.filter((p) =>
    (!f.developer || p.developerSlug === f.developer) &&
    (!f.community || p.community === f.community) &&
    (!f.type || p.type === f.type) &&
    (!f.handover || year(p.handover) === f.handover) &&
    inBudget(p.startingPrice, f.budget)
  );
  if (f.sort === "price-asc") list = [...list].sort((a, b) => (a.startingPrice || 9e12) - (b.startingPrice || 9e12));
  if (f.sort === "price-desc") list = [...list].sort((a, b) => (b.startingPrice || 0) - (a.startingPrice || 0));
  if (f.sort === "handover") list = [...list].sort((a, b) => (year(a.handover) || "9999").localeCompare(year(b.handover) || "9999"));

  const active = ["developer", "community", "type", "budget", "handover"].some((k) => f[k]);

  return (
    <>
      <div className="pills pills--wrap" role="group" aria-label="Filter by developer">
        <button type="button" className={!f.developer ? "is-on" : ""} aria-pressed={!f.developer} onClick={() => set("developer", "")}>All Projects</button>
        {developers.map((d) => (
          <button type="button" key={d.slug} className={f.developer === d.slug ? "is-on" : ""} aria-pressed={f.developer === d.slug} onClick={() => set("developer", d.slug)}>
            {d.name}
          </button>
        ))}
      </div>

      <form className="filter-bar" onSubmit={(e) => e.preventDefault()} aria-label="Filter projects">
        <div className="field">
          <label htmlFor="f-com">Community</label>
          <select id="f-com" value={f.community} onChange={(e) => set("community", e.target.value)}>
            <option value="">All communities</option>
            {communities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        {types.length > 0 && (
          <div className="field">
            <label htmlFor="f-type">Property type</label>
            <select id="f-type" value={f.type} onChange={(e) => set("type", e.target.value)}>
              <option value="">All types</option>
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        )}
        <div className="field">
          <label htmlFor="f-budget">Starting budget</label>
          <select id="f-budget" value={f.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Any budget</option>
            {budgets.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-hand">Handover year</label>
          <select id="f-hand" value={f.handover} onChange={(e) => set("handover", e.target.value)}>
            <option value="">Any year</option>
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-sort">Sort by</label>
          <select id="f-sort" value={f.sort} onChange={(e) => set("sort", e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="handover">Earliest handover</option>
          </select>
        </div>
      </form>

      <div className="count-line count-line--bar">
        <span>Showing {list.length} of {projects.length} curated active launches</span>
        {active && (
          <button type="button" className="link-btn" onClick={() => setF((s) => ({ developer: "", community: "", type: "", budget: "", handover: "", sort: s.sort }))}>
            Clear filters
          </button>
        )}
      </div>

      {list.length ? (
        <div className="card-grid">{list.map((p, i) => <ProjectCard key={p.slug} p={p} priority={i < 3} />)}</div>
      ) : (
        <p className="empty">No launches match these filters right now. Clear the filters, or ask our desk about upcoming releases.</p>
      )}
    </>
  );
}
