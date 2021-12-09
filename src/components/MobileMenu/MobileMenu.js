import "./MobileMenu.css";

import Navigation from "../Navigation/Navigation";
import { useState } from "react";

function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState();

  const [loggedIn, setLoggedIn] = useState(false);

  function openMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <>
      <button
        className={`mobile-menu__icon ${
          mobileMenuOpen ? "mobile-menu__icon_opened" : ""
        }`}
        onClick={openMobileMenu}></button>
      <div
        className={`mobile-menu ${mobileMenuOpen ? "mobile-menu_opened" : ""}`}>
        <Navigation />
      </div>
    </>
  );
}

export default MobileMenu;
