"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCurrency, formatMoney } from "./Currency";
import { IconCheck } from "./Icons";
import { GOLDEN_VISA_AED } from "@/lib/data";

const MIN = 500000;
const MAX = 12000000;
// The slider is split in two halves so the Golden Visa threshold (AED 2M) sits in the middle:
// left half = AED 500K–2M, right half = AED 2M–12M.
const toPrice = (t) => {
  const v = t <= 500 ? MIN + (t / 500) * (GOLDEN_VISA_AED - MIN) : GOLDEN_VISA_AED + ((t - 500) / 500) * (MAX - GOLDEN_VISA_AED);
  return Math.round(v / 10000) * 10000;
};
const toTick = (price) =>
  price <= GOLDEN_VISA_AED
    ? ((price - MIN) / (GOLDEN_VISA_AED - MIN)) * 500
    : 500 + ((price - GOLDEN_VISA_AED) / (MAX - GOLDEN_VISA_AED)) * 500;
const DLD = 0.04;

const PRESETS = {
  standard: {
    title: "10 / 70 / 20 Standard",
    sub: "Construction-linked (Emaar style)",
    rows: [
      { pct: 10, label: "Booking Down Payment", note: "Immediate reservation", dld: true },
      { pct: 70, label: "During Construction", note: "Paid in staged milestones until handover" },
      { pct: 20, label: "On Handover", note: "Due upon key handover & completion", accent: true },
    ],
  },
  monthly: {
    title: "1% Monthly Plan",
    sub: "Post-handover (Danube style)",
    rows: [
      { pct: 10, label: "Booking Down Payment", note: "Immediate reservation", dld: true },
      { pct: 50, label: "During Construction", note: "1% of the price every month", monthly: true },
      { pct: 10, label: "On Handover", note: "Due upon key handover" },
      { pct: 30, label: "Post-Handover", note: "1% monthly after you receive the keys", monthly: true, accent: true },
    ],
  },
};

/**
 * Off-plan payment & Golden Visa estimator.
 * projectPlan: optional [{pct,label}] from a real project (shown as a third option and selected by default).
 * showRoi: adds a rental-yield estimate (calculator page).
 */
export default function Estimator({ initialPrice = 2200000, projectPlan, projectName, showRoi = false, compact = false }) {
  const { code } = useCurrency();
  const [price, setPrice] = useState(Math.min(Math.max(initialPrice, MIN), MAX));
  const [plan, setPlan] = useState(projectPlan?.length ? "project" : "standard");
  const [yieldPct, setYieldPct] = useState(6.5);
  const money = (aed) => formatMoney(aed, code);

  const options = useMemo(() => {
    const o = { ...PRESETS };
    if (projectPlan?.length) {
      o.project = {
        title: `${projectPlan.map((s) => s.pct).join(" / ")} Project Plan`,
        sub: projectName ? `${projectName} official split` : "This project's split",
        rows: projectPlan.map((s, i) => ({
          pct: s.pct,
          label: i === 0 ? `${s.label} (Down Payment)` : s.label,
          note: i === 0 ? "Immediate reservation" : /hand/i.test(s.label) ? "Due upon key handover" : "Paid in staged milestones",
          dld: i === 0,
          accent: i === projectPlan.length - 1,
        })),
      };
    }
    return o;
  }, [projectPlan, projectName]);

  const current = options[plan] || options.standard;
  const eligible = price >= GOLDEN_VISA_AED;
  const annualRent = (price * yieldPct) / 100;

  return (
    <div className={`estimator ${compact ? "is-compact" : ""}`}>
      <div className="est-head">
        <div>
          <p className="eyebrow">Interactive financial tool</p>
          <h2>Off-Plan Payment &amp; Golden Visa Estimator</h2>
        </div>
        <span className={`visa-badge ${eligible ? "is-ok" : ""}`}>
          <span className="visa-dot"><IconCheck /></span>
          {eligible ? "10-Year UAE Golden Visa Eligible" : `${money(GOLDEN_VISA_AED - price)} below Golden Visa threshold`}
        </span>
      </div>

      <div className="est-body">
        <div className="est-controls">
          <div className="est-value">
            <label htmlFor="est-price">Target property value</label>
            <output htmlFor="est-price">{money(price)}</output>
          </div>
          <input id="est-price" type="range" min={0} max={1000} step={1} value={Math.round(toTick(price))}
            onChange={(e) => setPrice(toPrice(+e.target.value))} style={{ "--p": `${toTick(price) / 10}%` }} className="range"
            aria-valuetext={money(price)} />
          <div className="range-scale">
            <span>{formatMoney(MIN, code, { compact: true })}</span>
            <span className="range-mark">{formatMoney(GOLDEN_VISA_AED, code, { compact: true })} (Golden Visa threshold)</span>
            <span>{formatMoney(MAX, code, { compact: true })}+</span>
          </div>

          <p className="est-label">Developer payment structure</p>
          <div className="plan-opts">
            {Object.entries(options).map(([k, o]) => (
              <button key={k} type="button" className={plan === k ? "is-on" : ""} aria-pressed={plan === k} onClick={() => setPlan(k)}>
                <strong>{o.title}</strong>
                <span>{o.sub}</span>
              </button>
            ))}
          </div>

          {showRoi && (
            <div className="roi">
              <div className="est-value">
                <label htmlFor="est-yield">Assumed gross rental yield</label>
                <output htmlFor="est-yield">{yieldPct.toFixed(1)}%</output>
              </div>
              <input id="est-yield" type="range" min={4} max={10} step={0.1} value={yieldPct}
                onChange={(e) => setYieldPct(+e.target.value)} style={{ "--p": `${((yieldPct - 4) / 6) * 100}%` }} className="range" />
              <dl className="roi-grid">
                <div><dt>Est. annual rent</dt><dd>{money(annualRent)}</dd></div>
                <div><dt>Est. monthly rent</dt><dd>{money(annualRent / 12)}</dd></div>
                <div><dt>Upfront to handover</dt><dd>{money(price * (current.rows.filter((r) => !/post/i.test(r.label)).reduce((a, r) => a + r.pct, 0) / 100) + price * DLD)}</dd></div>
              </dl>
              <p className="fine">Estimates only, before service charges, vacancy and fees. Rents and values can rise or fall.</p>
            </div>
          )}
        </div>

        <div className="est-result">
          {current.rows.map((r) => (
            <div className="est-row" key={r.label}>
              <div>
                <strong>{r.label} ({r.pct}%)</strong>
                <span>{r.dld ? `${r.note} + 4% DLD registration (${money(price * DLD)})` : r.note}</span>
              </div>
              <div className={`est-amt ${r.accent ? "is-accent" : ""}`}>
                {money((price * r.pct) / 100)}
                {r.monthly && <small>≈ {money(price / 100)} / month</small>}
              </div>
            </div>
          ))}
          <Link href={`/contact?budget=${price}`} className="btn btn--dark btn--block btn--lg">Request Matching Units in This Budget</Link>
        </div>
      </div>
    </div>
  );
}
