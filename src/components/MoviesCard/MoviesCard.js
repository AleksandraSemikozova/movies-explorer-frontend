import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router";
import { useState } from "react";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();

  const [isSaved, setIsSaved] = useState();
  const [textButton, setTextButton] = React.useState("Сохранить");
  const movieSavedButtonClassName = `movie__save-btn ${
    isSaved ? "movie__save-btn_saved" : ""
  }
  
    ${pathname === "/saved-movies" ? "movie__remove-btn" : ""}`;

  const movieButtonTextClassName = `movie__save-btn-text ${
    isSaved ? "movie__save-btn-text_saved" : ""
  }
  ${pathname === "/saved-movies" ? "movie__save-btn-text_saved" : ""}`;

  function handleSaved() {
    if (!isSaved) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }

  return (
    <li className="movie">
      <div className="movie__description">
        <p className="movie__title">{movie.nameRu}</p>
        <p className="movie__duration">{movie.duration}</p>
      </div>
      <img className="movie__img" src={movie.image} alt={movie.nameRu} />
      <button className={movieSavedButtonClassName} onClick={handleSaved}>
        <span className={movieButtonTextClassName}>{textButton}</span>
      </button>
    </li>
  );
}

export default MoviesCard;
