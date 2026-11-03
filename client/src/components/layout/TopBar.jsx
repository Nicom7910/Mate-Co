import "./TopBar.css";

const ICONS = {
  truck: (
    <>
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </>
  ),
  card: (
    <>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </>
  ),
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </>
  ),
};

const BENEFITS = [
  { icon: "truck", text: "Entrega estimada en 3 días hábiles" },
  { icon: "card", text: "Pagá con tarjeta" },
  { icon: "tag", text: "Cancelá tu compra hasta 15 días hábiles después" },
];

const TopBar = () => (
  <div className="topbar">
    <ul className="container topbar__list">
      {BENEFITS.map(({ icon, text }) => (
        <li key={text} className="topbar__item">
          <svg
            className="topbar__icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {ICONS[icon]}
          </svg>
          {text}
        </li>
      ))}
    </ul>
  </div>
);

export default TopBar;
