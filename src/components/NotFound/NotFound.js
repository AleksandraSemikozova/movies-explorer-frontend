import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const history = useHistory();

  return (
    <section className="not-found">
      <div className="not-found__wrap">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>

        <Link className="not-found__link" onClick={() => history.goBack()}>
          Назад
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
