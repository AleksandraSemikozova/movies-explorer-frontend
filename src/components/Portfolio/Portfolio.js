import React from "react";
import "./Portfolio.css";
import FlexContainer from "../FlexContainer/FlexContainer";

function Portfolio() {
  return (
    <FlexContainer>
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__link-list">
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="#">
            Статичный сайт
          </a>
          <a className="portfolio__link portfolio__link-arrow" href="#">
            &#8599;
          </a>
        </li>
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="#">
            Адаптивный сайт
          </a>
          <a className="portfolio__link portfolio__link-arrow" href="#">
            &#8599;
          </a>
        </li>
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="#">
            Одностраничное приложение
          </a>
          <a className="portfolio__link portfolio__link-arrow" href="#">
            &#8599;
          </a>
        </li>
      </ul>
    </FlexContainer>
  );
}

export default Portfolio;
