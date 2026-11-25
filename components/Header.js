"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Brand from "./Brand";
import { CurrencyToggle } from "./Currency";
import { IconChevron, IconMenu, IconClose } from "./Icons";
import { navLinks, developers, projectsOf } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile drawer
  const [devOpen, setDevOpen] = useState(false); // developers dropdown
  const [scrolled, setScrolled] = useState(false);
  const ddRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setDevOpen(false);
  }, [pathname]);

  // Sticky header gets a compact, shadowed state once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-locked", open);
    return () => document.body.classList.remove("nav-locked");
  }, [open]);

  useEffect(() => {
    if (!devOpen) return;
    const close = (e) => {
      if (e.type === "keydown" ? e.key === "Escape" : !ddRef.current?.contains(e.target)) setDevOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [devOpen]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap header-inner">
        <Brand />

        <nav className="main-nav" aria-label="Primary">
          {navLinks.map((l) =>
            l.dropdown ? (
              <div className={`nav-dd ${devOpen ? "is-open" : ""}`} key={l.href} ref={ddRef}
                onMouseEnter={() => setDevOpen(true)} onMouseLeave={() => setDevOpen(false)}>
                <button type="button" className={`nav-link ${isActive(l.href) ? "is-current" : ""}`}
                  aria-expanded={devOpen} aria-haspopup="true" onClick={() => setDevOpen((o) => !o)}>
                  {l.label} <IconChevron />
                </button>
                <div className="nav-dd-panel">
                  {developers.map((d) => (
                    <Link key={d.slug} href={`/developers/${d.slug}`} className="nav-dd-item">
                      <strong>{d.name}</strong>
                      <span>{projectsOf(d.slug).length} active launches</span>
                    </Link>
                  ))}
                  <Link href="/developers" className="nav-dd-all">All developers</Link>
                </div>
              </div>
            ) : (
              <Link key={l.href} href={l.href} className={`nav-link ${isActive(l.href) ? "is-current" : ""}`}>
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="header-tools">
          <CurrencyToggle className="hide-sm" />
          <Link href="/contact" className="btn btn--dark hide-sm">Book Consultation</Link>
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} hidden={!open}>
        <div className="wrap">
          {navLinks.map((l) => (
            <div key={l.href}>
              <Link href={l.href} className={`m-link ${isActive(l.href) ? "is-current" : ""}`}>{l.label}</Link>
              {l.dropdown && (
                <div className="m-sub">
                  {developers.map((d) => (
                    <Link key={d.slug} href={`/developers/${d.slug}`}>{d.name}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="m-foot">
            <CurrencyToggle />
            <Link href="/contact" className="btn btn--dark btn--block">Book Consultation</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
