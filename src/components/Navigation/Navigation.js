import React from "react";
import "./Navigation.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useEffect } from "react/cjs/react.development";

function Navigation({loggedIn, isMobileView = false}) {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  const text = `${loggedIn ? "Аккаунт" : "Войти"}`;

  useEffect(() => {
    console.log("is mobile", isMobile)
  }, [isMobile]);

  return (
    <nav
      className={`
        navigation
        ${isMobileView ? "navigation_is-mobile" : ""}
        ${!isMobileView && isMobile && loggedIn ? "navigation_hidden" : ""}
      `}
    >
      <ul className={`navigation__list ${!isMobileView && isMobile && !loggedIn ? "navigation__list_row" : ""}`}>
        <div className="navigation__list-links">
          {loggedIn && isMobileView && (
            <li
              className={`navigation__item ${
                 !isMobile ? "navigation__item_mobile_hidden" : ""
              }`}>
              <NavLink className="navigation__link" to="/">
                Главная
              </NavLink>
              {/* ссылка скрыта для неавториз польз-ля */}
            </li>
          )}

          {loggedIn && (
            <li
              className={`navigation__item ${
                !isMobileView && isMobile ? "navigation__item_mobile_hidden" : "navigation__item_visible"
              }`}>
              <NavLink className="navigation__link" to="/movies">
                Фильмы
              </NavLink>
              {/* ссылка скрыта для неавториз польз-ля */}
            </li>
          )}
          {loggedIn ? (
            <li className="navigation__item">
              <NavLink to="/signup" className="navigation__link">
                Сохраненные фильмы
              </NavLink>
            </li>
          ) : (
            <li className="navigation__item">
              <NavLink className="navigation__link" to="/saved-movies">
                Регистрация
              </NavLink>
            </li>
          )}
          {/* ссылка регистрация превращается в ссылку Сохраненные фильмы после авториз */}
        </div>

        <div>
          {loggedIn ? (
            <li className="navigation__item">
              <NavLink
                className="navigation__link navigation__link_type_account"
                activeClassName="mobile-menu__link_active"
                to="/profile">
                {text}
                <div className="navigation__link_type_account-icon"></div>
              </NavLink>
            </li>
          ) : (
            <li className="navigation__item">
              <Link
                to="/signin"
                className="navigation__link navigation__link_type_signin">
                {text}
              </Link>
            </li>
          )}
          {/* кнопка войти становится кнопкой аккаунт после авториз */}
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
