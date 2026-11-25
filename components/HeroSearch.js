"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconSearch } from "./Icons";
import { developers, communities, budgets, properties } from "@/lib/data";

export default function HeroSearch() {
  const router = useRouter();
  const [v, setV] = useState({ developer: "", type: "", community: "", budget: "" });
  const types = [...new Set(properties.map((p) => p.type).filter(Boolean))];
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  function go(e) {
    e.preventDefault();
    const q = new URLSearchParams(Object.entries(v).filter(([, x]) => x));
    router.push(`/properties${q.toString() ? `?${q}` : ""}`);
  }

  return (
    <form className="hero-search" onSubmit={go} aria-label="Search projects">
      <div className="field">
        <label htmlFor="hs-dev">Developer</label>
        <select id="hs-dev" value={v.developer} onChange={set("developer")}>
          <option value="">All Partner Developers</option>
          {developers.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
        </select>
      </div>
      {types.length > 0 ? (
        <div className="field">
          <label htmlFor="hs-type">Property type</label>
          <select id="hs-type" value={v.type} onChange={set("type")}>
            <option value="">All Asset Classes</option>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      ) : (
        <div className="field">
          <label htmlFor="hs-com">Community</label>
          <select id="hs-com" value={v.community} onChange={set("community")}>
            <option value="">All Communities</option>
            {communities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor="hs-budget">Starting budget</label>
        <select id="hs-budget" value={v.budget} onChange={set("budget")}>
          <option value="">Any Budget Range</option>
          {budgets.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
      </div>
      <button type="submit" className="btn btn--dark btn--lg"><IconSearch /> Explore Launches</button>
    </form>
  );
}
