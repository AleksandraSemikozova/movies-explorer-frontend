import React from "react";
import "./Navigation.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

function Navigation() {
  const { pathname } = useLocation();

  const [loggedIn, setLoggedIn] = useState(true);
  const text = `${loggedIn ? "Аккаунт" : "Войти"}`;
  return (
    <nav
      className={`navigation ${loggedIn ? "navigation_is-mobile" : ""}
    `}>
      <ul className="navigation__list">
        <div className="navigation__list-links">
          <li
            className={`navigation__item ${
              loggedIn ? "navigation__item_visible" : "navigation__item_visible"
            }`}>
            <NavLink className="navigation__link" to="/">
              Главная
            </NavLink>
            {/* ссылка скрыта для неавториз польз-ля */}
          </li>

          <li
            className={`navigation__item ${
              loggedIn ? "" : "navigation__item_visible"
            }`}>
            <NavLink className="navigation__link" to="/movies">
              Фильмы
            </NavLink>
            {/* ссылка скрыта для неавториз польз-ля */}
          </li>
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
