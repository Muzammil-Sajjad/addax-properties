"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { developers } from "@/lib/data";

const CODES = [
  ["+92", "PK"], ["+971", "UAE"], ["+44", "UK"], ["+1", "US/CA"], ["+966", "KSA"],
  ["+974", "QA"], ["+965", "KW"], ["+968", "OM"], ["+973", "BH"], ["+61", "AU"],
];
const OBJECTIVES = ["Capital Appreciation (Off-Plan)", "Rental Income", "Golden Visa", "Personal / Second Home"];
const REQUESTS = ["Latest pricing", "Brochure & floor plans", "Availability", "Consultation call"];

function Field({ id, label, required, error, children, wide }) {
  return (
    <div className={`field ${error ? "has-error" : ""} ${wide ? "is-wide" : ""}`}>
      <label htmlFor={id}>{label}{required && " *"}</label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

/**
 * variant "short": name, email, phone, objective (home "Private Desk").
 * variant "full": adds budget, developer and message (contact page).
 * project: shows a request-type select and sends the project name.
 */
export default function LeadForm({ variant = "short", project = null, cta = "Request Curated Portfolio & Price List" }) {
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const full = variant === "full";
  const [budgetFromUrl, setBudgetFromUrl] = useState("");
  useEffect(() => {
    const b = new URLSearchParams(window.location.search).get("budget");
    if (b && /^\d+$/.test(b)) setBudgetFromUrl(Number(b).toLocaleString("en-US"));
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const v = Object.fromEntries(new FormData(form).entries());
    const err = {};
    if (!v.name?.trim()) err.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email || "")) err.email = "Enter a valid email address.";
    if (!/^[\d\s()-]{6,}$/.test((v.phone || "").trim())) err.phone = "Enter a valid WhatsApp or phone number.";
    setErrors(err);
    if (Object.keys(err).length) return;
    if (v.website) { setState("done"); return; } // honeypot

    setState("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, project, page: window.location.pathname }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="form-done" role="status">
        <h3>Thank you, your request is in.</h3>
        <p>Our advisory desk will review your criteria and contact you shortly on WhatsApp or email.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <Field id="lf-name" label="Full name" required error={errors.name}>
          <input id="lf-name" name="name" type="text" autoComplete="name" placeholder="e.g., Ahmed Khan" />
        </Field>
        <Field id="lf-email" label="Email address" required error={errors.email}>
          <input id="lf-email" name="email" type="email" autoComplete="email" placeholder="name@domain.com" />
        </Field>
        <Field id="lf-phone" label="WhatsApp / phone" required error={errors.phone}>
          <div className="phone-row">
            <select name="dial" aria-label="Country code" defaultValue="+92">
              {CODES.map(([c, n]) => <option key={c} value={c}>{c} ({n})</option>)}
            </select>
            <input id="lf-phone" name="phone" type="tel" autoComplete="tel-national" placeholder="300 1234567" />
          </div>
        </Field>
        {project ? (
          <Field id="lf-req" label="I would like">
            <select id="lf-req" name="request" defaultValue={REQUESTS[0]}>
              {REQUESTS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
        ) : (
          <Field id="lf-obj" label="Primary objective">
            <select id="lf-obj" name="objective" defaultValue={OBJECTIVES[0]}>
              {OBJECTIVES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        )}
        {full && (
          <>
            <Field id="lf-budget" label="Investment budget (AED)">
              <input key={budgetFromUrl} id="lf-budget" name="budget" type="text" inputMode="numeric" defaultValue={budgetFromUrl} placeholder="e.g., 2,000,000" />
            </Field>
            <Field id="lf-dev" label="Preferred developer">
              <select id="lf-dev" name="developer" defaultValue="">
                <option value="">No preference</option>
                {developers.map((d) => <option key={d.slug}>{d.name}</option>)}
              </select>
            </Field>
            <Field id="lf-msg" label="Message" wide>
              <textarea id="lf-msg" name="message" rows={4} placeholder="Tell us about preferred areas, unit type or timeline." />
            </Field>
          </>
        )}
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="lf-website">Website</label>
        <input id="lf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn--dark btn--block btn--lg" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : cta}
      </button>
      {state === "error" && <p className="field-error center">Something went wrong. Please try again or call us.</p>}
      <p className="form-note">By submitting you agree to be contacted by Addax Properties. See our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
    </form>
  );
}
