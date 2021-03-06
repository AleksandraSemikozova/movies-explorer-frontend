import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className="footer__wrap">
          <p className="footer__copyright">
            &#169; Александра Семикозова, 2021
          </p>
          <nav className="footer__nav">
            <ul className="footer__links">
              <li className="footer__link-list">
                <a className="footer__link" href="https://practicum.yandex.ru/">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__link-list">
                <a
                  className="footer__link"
                  href="https://github.com/AleksandraSemikozova">
                  GitHub
                </a>
              </li>
              <li className="footer__link-list">
                <a className="footer__link" href="https://www.facebook.com">
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
