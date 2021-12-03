import React from "react";
import "./Promo.css";
import NavTab from "../NavTab/NavTab";

function Promo(props) {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab
        href="#about"
        buttonText1="О проекте"
        href="#techs"
        buttonText2="Техники"
        href="#student"
        buttonText3="Студент"
      />
    </section>
  );
}

export default Promo;
