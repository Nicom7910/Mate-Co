import { WHATSAPP_NUMBER } from "../../config/contact.js";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  if (!WHATSAPP_NUMBER) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      className="whatsapp-button"
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      title="¿Necesitás ayuda? Escribinos por WhatsApp"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.5 8.5 0 1 1 21 11.5z" />
        <path d="M9 8.5c.2 2.5 2.5 5 5.5 6l1.5-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
