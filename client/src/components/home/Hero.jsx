import { useSelector } from "react-redux";
import hero from "../../assets/hero.jpg";
import { selectToken } from "../../redux/authSlice.js";
import LinkButton from "../common/LinkButton.jsx";
import "./Hero.css";

const Hero = () => {
  const loggedIn = Boolean(useSelector(selectToken));

  return (
    <section className="hero">
      <img
        src={hero}
        alt="Mate de calabaza, termo y bolso de cuero sobre una mesa de madera"
        className="hero__image"
      />
      <div className="container hero__content">
        <div className="hero__text">
          <h1 className="hero__title">El mate de todos los días, con oficio.</h1>
          <p className="hero__subtitle">
            Mates, bombillas y accesorios hechos para acompañarte.
          </p>
          <div className="hero__actions">
            <LinkButton to="/products" variant="light">
              Ver productos
            </LinkButton>
            {!loggedIn && (
              <LinkButton to="/register" variant="outline-light">
                Crear cuenta
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
