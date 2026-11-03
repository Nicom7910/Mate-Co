import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectToken } from "../../redux/authSlice.js";
import { selectCategories } from "../../redux/categoriesSlice.js";
import { selectIsAdmin } from "../../redux/userSlice.js";
import FooterColumn from "./FooterColumn.jsx";
import "./Footer.css";

const HOW_TO_BUY = [
  "Elegí tus productos y agregalos al carrito.",
  "Pagá con tarjeta.",
  "Recibí tu pedido en 3 días hábiles.",
  "Cancelá tu compra hasta 15 días hábiles después.",
];

const Footer = () => {
  const categories = useSelector(selectCategories);
  const loggedIn = Boolean(useSelector(selectToken));
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">Mate&amp;Co</span>
          <p className="footer__text">
            Mates, bombillas y accesorios para el mate de todos los días.
          </p>
        </div>
        <FooterColumn title="Categorías">
          {categories.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/products?category=${id}`}>{name}</Link>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Mi cuenta">
          {loggedIn ? (
            <>
              <li>
                <Link to="/profile">Mi perfil</Link>
              </li>
              <li>
                <Link to="/orders">{isAdmin ? "Pedidos" : "Mis pedidos"}</Link>
              </li>
              {!isAdmin && (
                <li>
                  <Link to="/cart">Carrito</Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Ingresar</Link>
              </li>
              <li>
                <Link to="/register">Crear cuenta</Link>
              </li>
            </>
          )}
        </FooterColumn>
        <FooterColumn title="Cómo comprar">
          {HOW_TO_BUY.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </FooterColumn>
      </div>
      <div className="footer__bottom">
        <div className="container footer__copyright">
          © {new Date().getFullYear()} Mate&amp;Co · Proyecto UADE · Aplicaciones
          Interactivas
        </div>
      </div>
    </footer>
  );
};

export default Footer;
