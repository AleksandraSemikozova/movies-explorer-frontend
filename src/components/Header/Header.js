import React from 'react';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import MobileMenu from '../MobileMenu/MobileMenu';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useIsMobile';

function Header(props) {
  const isMobile = useIsMobile();

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper-logo">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
        </div>
        <div className="header__wrap-nav">
          <Navigation loggedIn={props.loggedIn} />
        </div>
        {isMobile && <MobileMenu loggedIn={props.loggedIn} />}
      </div>
    </header>
  );
}

export default Header;
