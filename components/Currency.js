"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { currencies } from "@/lib/data";

const Ctx = createContext({ code: "AED", setCode: () => {} });
const KEY = "addax-currency";

export function CurrencyProvider({ children }) {
  const [code, setCodeState] = useState("AED");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved && currencies[saved]) setCodeState(saved);
    } catch {}
  }, []);
  const setCode = (c) => {
    setCodeState(c);
    try { localStorage.setItem(KEY, c); } catch {}
  };
  return <Ctx.Provider value={{ code, setCode }}>{children}</Ctx.Provider>;
}

export const useCurrency = () => useContext(Ctx);

export function formatMoney(aed, code = "AED", { compact = false } = {}) {
  const v = aed / currencies[code].rate;
  const n = compact
    ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v)
    : new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(v));
  return `${currencies[code].symbol} ${n}`;
}

// <Price aed={1850000} /> shows the amount in the visitor's chosen currency.
export function Price({ aed, fallback = "Price on request", compact }) {
  const { code } = useCurrency();
  if (!aed) return <>{fallback}</>;
  return <>{formatMoney(aed, code, { compact })}</>;
}

export function CurrencyToggle({ className = "" }) {
  const { code, setCode } = useCurrency();
  return (
    <div className={`cur-toggle ${className}`} role="group" aria-label="Display currency">
      {Object.keys(currencies).map((c) => (
        <button key={c} type="button" aria-pressed={code === c} className={code === c ? "is-on" : ""} onClick={() => setCode(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
