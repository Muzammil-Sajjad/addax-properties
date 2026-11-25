import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import CtaBand from "@/components/CtaBand";
import { services, steps, faqs } from "@/lib/data";

export const metadata = {
  title: "Advisory Services",
  description: "Personal Dubai off-plan advisory for overseas buyers: project comparison, payment plans, remote purchase support and Golden Visa guidance.",
};

export default function AdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow="The Addax standard"
        title="Personal Advisory,"
        accent="Wherever You Are"
        text="Addax Properties helps overseas buyers, especially from Pakistan, invest in Dubai’s primary market with clarity, discipline and convenience."
        image="/images/properties/damac-islands-2/cover.png"
      />

      <section className="section">
        <div className="wrap split">
          <div data-reveal>
            <p className="eyebrow">Who we are</p>
            <h2>Built on Trust. Driven by Your Vision.</h2>
          </div>
          <div className="prose" data-reveal>
            <p>Addax Properties is a boutique real estate advisory focused on curated off-plan launches in Dubai. Instead of thousands of listings, we follow a short list of active primary releases from established developers and explain each one clearly.</p>
            <p>Our role is to understand your goals, compare the right options with you and guide every step of the purchase, from reservation to handover, without you needing to travel.</p>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="wrap">
          <SectionHead eyebrow="What we do" title="Advisory Services" center />
          <div className="note-grid note-grid--3">
            {services.map(([t, d], i) => (
              <div className="note-card" key={t} data-reveal><span className="std-no">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title="Your Purchase, Step by Step" light />
          <ol className="process">
            {steps.map(([t, d], i) => (
              <li key={t} data-reveal><span className="std-no">0{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="Questions" title="Frequently Asked Questions" center />
          <div className="faq">
            {faqs.map(([q, a]) => (
              <details key={q} data-reveal><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
