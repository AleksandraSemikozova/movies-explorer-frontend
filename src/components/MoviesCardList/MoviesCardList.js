import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from "../../utils/constants";

function MoviesCardList(props) {
  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map((movie) => {
          return <MoviesCard movie={movie} key={movie._id} />;
        })}
      </ul>
      <button
        type="button"
        aria-label="Показать больше"
        className="movies__show-more-btn">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
