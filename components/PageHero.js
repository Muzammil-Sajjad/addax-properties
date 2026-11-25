export default function PageHero({ eyebrow, title, accent, text, image, children }) {
  return (
    <section className="page-hero" style={image ? { "--hero-img": `url(${image})` } : undefined}>
      <div className="wrap">
        {eyebrow && <p className="pill-eyebrow"><span className="dot" />{eyebrow}</p>}
        <h1>{title} {accent && <em>{accent}</em>}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </section>
  );
}
