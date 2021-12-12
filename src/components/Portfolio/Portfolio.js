import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__link-list">
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/AleksandraSemikozova/how-to-learn">
            Статичный сайт
          </a>
          <a
            className="portfolio__link portfolio__link-arrow"
            href="https://github.com/AleksandraSemikozova/how-to-learn">
            &#8599;
          </a>
        </li>
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/AleksandraSemikozova/russian-travel">
            Адаптивный сайт
          </a>
          <a
            className="portfolio__link portfolio__link-arrow"
            href="https://github.com/AleksandraSemikozova/russian-travel">
            &#8599;
          </a>
        </li>
        <li className="portfolio__link-item">
          <a
            className="portfolio__link"
            href="https://github.com/AleksandraSemikozova/react-mesto-api-full">
            Одностраничное приложение
          </a>
          <a
            className="portfolio__link portfolio__link-arrow"
            href="https://github.com/AleksandraSemikozova/react-mesto-api-full">
            &#8599;
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
