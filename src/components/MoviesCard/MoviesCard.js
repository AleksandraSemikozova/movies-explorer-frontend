import React, { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const { pathname } = useLocation();

  const [textButton, setTextButton] = useState('Сохранить');
  const movieSavedButtonClassName = `movie__save-btn ${
    props.isSaved ? 'movie__save-btn_saved' : ''
  }

    ${pathname === '/saved-movies' ? 'movie__remove-btn' : ''}`;

  const movieButtonTextClassName = `movie__save-btn-text ${
    props.isSaved ? 'movie__save-btn-text_saved' : ''
  }
  ${pathname === '/saved-movies' ? 'movie__save-btn-text_saved' : ''}`;

  const film = props.dataFilm;

  function handleRemove() {
    props.removeMovie(film);
  }

  function handleSave() {
    props.onSave(film);
  }

  const duration = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  return (
    <li className="movie">
      <div className="movie__description">
        <p className="movie__title">{film.nameRU}</p>
        <p className="movie__duration">{duration(film.duration)}</p>
      </div>
      <a
        href={film.trailer}
        target="_blank"
        rel="noreferrer"
        className="movie__trailer-link">
        <img className="movie__img" src={film.image} alt={film.nameRU} />
      </a>
      <button
        className={movieSavedButtonClassName}
        onClick={!props.isSavedMoviesList ? handleSave : handleRemove}>
        <span className={movieButtonTextClassName}>{textButton}</span>
      </button>
    </li>
  );
}

export default MoviesCard;
