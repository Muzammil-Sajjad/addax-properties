export default function SectionHead({ eyebrow, title, text, center = false, light = false, children }) {
  return (
    <div className={`sec-head ${center ? "is-center" : ""} ${light ? "is-light" : ""}`} data-reveal>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {text && <p className="sec-text">{text}</p>}
      </div>
      {children}
    </div>
  );
}
