import React from "react";
import { NavLink } from "react-router-dom";
import "./NavTab.css";

function NavTab(props) {
  return (
    <ul className="navtab">
      <li className="navtab__item">
        <a className="navtab__link" href="#about">
          О проекте
        </a>
      </li>

      <li className="navtab__item">
        <a className="navtab__link" href="#techs">
          Техники
        </a>
      </li>
      <li className="navtab__item">
        <a className="navtab__link" href="#student">
          Студент
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
