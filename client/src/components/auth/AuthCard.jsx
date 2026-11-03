import matero from "../../assets/matero.jpg";
import "./AuthCard.css";

const AuthCard = ({ title, subtitle, wide = false, children }) => (
  <section className="container page auth-page">
    <div className={`auth-shell ${wide ? "auth-shell--wide" : ""}`}>
      <aside className="auth-shell__aside" aria-hidden="true">
        <img src={matero} alt="" className="auth-shell__image" />
        <div className="auth-shell__brand">
          <span className="auth-shell__eyebrow">Mate&amp;Co</span>
          <p className="auth-shell__tagline">
            El mate de todos los días, con oficio.
          </p>
        </div>
      </aside>
      <div className="auth-card">
        <h1 className="auth-card__title">{title}</h1>
        <p className="auth-card__subtitle">{subtitle}</p>
        {children}
      </div>
    </div>
  </section>
);

export default AuthCard;
