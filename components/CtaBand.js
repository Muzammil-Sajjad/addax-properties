import Link from "next/link";
import { IconArrow } from "./Icons";

export default function CtaBand({
  eyebrow = "Private desk",
  title = "Speak With an Investment Advisor",
  text = "Share your budget and goals. We’ll come back with a curated shortlist, price lists and payment schedules.",
  label = "Book Consultation",
  href = "/contact",
}) {
  return (
    <section className="section section--dark cta-band">
      <div className="wrap center" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="cta-text">{text}</p>
        <Link href={href} className="btn btn--gold btn--lg">{label} <IconArrow /></Link>
      </div>
    </section>
  );
}
