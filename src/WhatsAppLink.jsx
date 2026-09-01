import { useEffect, useRef, useState } from "react";
import { SOCIAL_ICONS } from "./SocialIcons.jsx";
import FingerprintSpinner from "./FingerprintSpinner.jsx";

const BUSY_MS = 700;

export default function WhatsAppLink({ href }) {
  const [isBusy, setIsBusy] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // No preventDefault: the browser opens the tab on the click itself.
  // Holding the navigation back to run the animation first would put the
  // window.open outside the user gesture and trip popup blockers.
  const handleClick = () => {
    clearTimeout(timer.current);
    setIsBusy(true);
    timer.current = setTimeout(() => setIsBusy(false), BUSY_MS);
  };

  return (
    <a
      className={isBusy ? "whatsapp-float is-busy" : "whatsapp-float"}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Message NEEMA HOMES on WhatsApp"
      onClick={handleClick}
    >
      <span className="btn-label">{SOCIAL_ICONS.whatsapp}</span>
      <FingerprintSpinner />
    </a>
  );
}
