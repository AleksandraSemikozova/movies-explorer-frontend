import "./MobileMenu.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState();

  const openMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <button
        className={`mobile-menu__icon ${
          mobileMenuOpen ? "mobile-menu__icon_open" : ""
        }`}
        onClick={openMobileMenu}></button>
      <div
        className={`mobile-menu ${mobileMenuOpen ? "mobile-menu_opened" : ""}`}>
        <nav className="mobile-menu__container">
          <div className="mobile-menu__links">
            <NavLink
              className="mobile-menu__link"
              activeClassName="mobile-menu__link_active"
              exact
              to="/">
              Главная
            </NavLink>
            <NavLink
              className="mobile-menu__link"
              activeClassName="mobile-menu__link_active"
              exact
              to="/movies">
              Фильмы
            </NavLink>
            <NavLink
              className="mobile-menu__link"
              activeClassName="mobile-menu__link_active"
              exact
              to="/saved-movies">
              Сохраненные фильмы
            </NavLink>
          </div>
          <div className="mobile-menu__account">
            <NavLink
              className="mobile-menu__link mobile-menu__link_account"
              activeClassName="mobile-menu__link_active"
              exact
              to="/profile">
              Аккаунт
              <button
                className="mobile-menu__account-icon"
                type="button"></button>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
}

export default MobileMenu;
