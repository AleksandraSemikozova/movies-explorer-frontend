import React from "react";
import "./NavTab.css";

function NavTab(props) {
  return (
    <ul className="navtab">
      <li className="navtab__link" href={props.link}>
        {props.buttonText1}
      </li>
      <li className="navtab__link" href={props.link}>
        {props.buttonText2}
      </li>
      <li className="navtab__link" href={props.link}>
        {props.buttonText3}
      </li>
    </ul>
  );
}

export default NavTab;
