const FooterColumn = ({ title, children }) => (
  <div className="footer__column">
    <h3 className="footer__title">{title}</h3>
    <ul className="footer__list">{children}</ul>
  </div>
);

export default FooterColumn;
