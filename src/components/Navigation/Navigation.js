import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link className="navigation__link" to="/movies">
            Фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <Link className="navigation__link" to="/saved-movies">
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
