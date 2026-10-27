import matero from "../../assets/matero.jpg";
import LinkButton from "../common/LinkButton.jsx";
import "./Hero.css";

const Hero = ({ loggedIn }) => (
  <section className="container hero">
    <div className="hero__text">
      <span className="hero__eyebrow">Tienda de mates</span>
      <h1 className="hero__title">El mate de todos los días, con oficio.</h1>
      <p className="hero__subtitle">
        Mates de calabaza, madera y cerámica, bombillas y accesorios. Elegí lo
        que te gusta, armá tu carrito y confirmá tu compra.
      </p>
      <div className="hero__actions">
        <LinkButton to="/products" variant="primary">
          Ver productos
        </LinkButton>
        {!loggedIn && (
          <LinkButton to="/register" variant="outline">
            Crear cuenta
          </LinkButton>
        )}
      </div>
    </div>
    <div className="hero__image">
      <img src={matero} alt="Set matero de cuero con mate, bombilla y termo" />
    </div>
  </section>
);

export default Hero;
