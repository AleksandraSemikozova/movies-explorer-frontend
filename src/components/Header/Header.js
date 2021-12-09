import React from "react";
import logo from "../../images/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header(props) {
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);

  const [activeBurger, setActiveBurger] = React.useState(false);

  function handleActiveBurger(props) {
    setActiveBurger(!activeBurger);
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper-logo">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
        </div>
        <div className="header__wrap-nav">
          <Navigation />
        </div>
        {loggedIn ? <MobileMenu /> : ""}
      </div>
    </header>
  );
}

export default Header;
