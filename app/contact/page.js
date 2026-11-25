import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { IconWhatsApp } from "@/components/Icons";
import { site, whatsappHref, telHref } from "@/lib/data";

export const metadata = {
  title: "Book a Consultation",
  description: "Speak with the Addax Properties advisory desk about Dubai off-plan launches, payment plans and Golden Visa eligibility.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Private desk"
        title="Book Your"
        accent="Consultation"
        text="Share your budget and goals. Our advisory desk will come back with a curated shortlist, official price lists and payment schedules."
      />
      <section className="section">
        <div className="wrap contact">
          <div className="desk-form" data-reveal>
            <LeadForm variant="full" cta="Send My Enquiry" />
          </div>
          <aside className="contact-card" data-reveal>
            <p className="eyebrow">International desk</p>
            <h2>Talk to Us Directly</h2>
            <dl>
              <div><dt>Client desk</dt><dd><a href={telHref}>{site.phone}</a></dd></div>
              {site.email && <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>}
              <div><dt>Office</dt><dd>{site.address}</dd></div>
              <div><dt>Hours</dt><dd>{site.hours}</dd></div>
            </dl>
            {site.whatsappNumber && (
              <a href={whatsappHref} className="btn btn--gold btn--block" target="_blank" rel="noopener noreferrer"><IconWhatsApp /> Chat on WhatsApp</a>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
