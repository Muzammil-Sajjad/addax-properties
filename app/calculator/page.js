import PageHero from "@/components/PageHero";
import Estimator from "@/components/Estimator";
import SectionHead from "@/components/SectionHead";
import CtaBand from "@/components/CtaBand";

export const metadata = {
  title: "ROI & Payment Plan Calculator",
  description: "Estimate off-plan booking, construction and handover payments, the 4% DLD fee, Golden Visa eligibility and indicative rental yield for Dubai property.",
};

const NOTES = [
  ["Dubai Land Department fee", "4% of the purchase price, paid at registration together with a small admin fee."],
  ["Construction-linked plans", "Instalments fall due as the project reaches construction milestones and are paid into the project’s escrow account."],
  ["Post-handover plans", "Some developers let you pay part of the price monthly after you receive the keys, often 1% per month."],
  ["Golden Visa", "Property worth AED 2M or more may support a 10-year UAE residence application, subject to current rules."],
];

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Interactive financial tool"
        title="ROI & Payment"
        accent="Calculator"
        text="See how an off-plan purchase is paid for, what you need upfront and what a property could earn in rent. Switch currency from the header."
      />
      <section className="section">
        <div className="wrap wrap--narrow">
          <Estimator showRoi />
        </div>
      </section>
      <section className="section section--sand">
        <div className="wrap">
          <SectionHead eyebrow="Good to know" title="How the Numbers Work" />
          <div className="note-grid">
            {NOTES.map(([t, d]) => (<div className="note-card" key={t} data-reveal><h3>{t}</h3><p>{d}</p></div>))}
          </div>
          <p className="fine mt">Figures are estimates for guidance only and are not financial advice. Confirm exact amounts with the developer’s payment schedule.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
