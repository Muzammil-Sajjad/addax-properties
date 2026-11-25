import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page could not be" accent="found" text="The link may be old or the page may have moved.">
      <div className="btn-row"><Link href="/" className="btn btn--gold">Back to Home</Link><Link href="/properties" className="btn btn--ghost">View Projects</Link></div>
    </PageHero>
  );
}
