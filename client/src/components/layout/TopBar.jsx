import "./TopBar.css";

const BENEFITS = [
  "Entrega estimada en 3 días hábiles",
  "Pagá con tarjeta",
  "Cancelá tu compra hasta 15 días hábiles después",
];

const TopBar = () => (
  <div className="topbar">
    <ul className="container topbar__list">
      {BENEFITS.map((text) => (
        <li key={text} className="topbar__item">
          {text}
        </li>
      ))}
    </ul>
  </div>
);

export default TopBar;
