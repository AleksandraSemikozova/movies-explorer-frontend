import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router";
import CardMovie from "../../images/card-movie.png";
import SaveMovieIcon from "../../images/icon-save-btn.svg";
import RemoveMovieIcon from "../../images/icon-remove-movie.svg";

function MoviesCard(props) {
  const { pathname } = useLocation;

  return (
    <li className="movie">
      <div className="movie__description">
        <p className="movie__title">В погоне за Бенкси</p>
        <p className="movie__duration">27 minutes</p>
      </div>
      <img className="movie__img" src={CardMovie} alt="Test image" />
      <button
        className="movie__save-btn"
        type="button"
        aria-label="Сохранить"
        // className={movieSavedButtonClassName}
      >
        Сохранить
      </button>
    </li>
  );
}

export default MoviesCard;
