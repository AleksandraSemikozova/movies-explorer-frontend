import "./MobileMenu.css";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

function MobileMenu({ loggedIn }) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  function toggleMobileMenu() {
    setMobileMenuOpen((prev) => !prev);
  }

  return (
    <div
      className={`mobile-menu ${
        !loggedIn || !isMobile ? "mobile-menu_hidden" : ""
      }`}>
      <button
        className={`mobile-menu__icon ${
          mobileMenuOpen ? "mobile-menu__icon_opened" : ""
        }`}
        onClick={toggleMobileMenu}></button>
      <div
        className={`mobile-menu__popup ${
          mobileMenuOpen ? "mobile-menu__popup_opened" : ""
        }`}>
        <Navigation isMobileView={true} loggedIn={loggedIn} />
      </div>
    </div>
  );
}

export default MobileMenu;
