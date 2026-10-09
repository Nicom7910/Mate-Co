import "./AuthCard.css";

const AuthCard = ({ title, subtitle, wide = false, children }) => (
  <section className="container page auth-card-page">
    <div className={`auth-card ${wide ? "auth-card--wide" : ""}`}>
      <h1 className="auth-card__title">{title}</h1>
      <p className="auth-card__subtitle">{subtitle}</p>
      {children}
    </div>
  </section>
);

export default AuthCard;
