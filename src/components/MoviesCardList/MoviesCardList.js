import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  moviesWithMobile,
  moviesWithTablet,
  moviesWithDesktop,
  moviesShowMore,
  moviesShowMoreDesktop,
  windowWidthDesktop,
  windowWidthTablet,
  windowWidthMobile,
} from '../../utils/constants';

function MoviesCardList(props) {
  const [moviesCount, setMoviesCount] = useState(0);
  const [moreMoviesCount, setMoreMoviesCount] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const getMoreMovies = () => {
    setMoviesCount(moviesCount + moreMoviesCount);
  };

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    if (props.isAllMovies) {
      if (width >= windowWidthDesktop) {
        setMoviesCount(moviesWithDesktop);
        setMoreMoviesCount(moviesShowMoreDesktop);
      }
      if (width < windowWidthDesktop && width >= windowWidthTablet) {
        setMoviesCount(moviesWithTablet);
        setMoreMoviesCount(moviesShowMore);
      } else if (width >= windowWidthMobile && width < windowWidthTablet) {
        setMoviesCount(moviesWithMobile);
        setMoreMoviesCount(moviesShowMore);
      }
    } else {
      setMoviesCount(props.dataMovies.length + 1);
    }
  }, [props.dataMovies.length, width, props.isAllMovies]);

  return (
    <section className="movies">
      <ul className="movies__list">
        {props.dataMovies.slice(0, moviesCount).map((item) => (
          <MoviesCard
            key={item.movieId || item._id}
            dataFilm={item}
            onSave={props.saveMovie}
            isSaved={props.isSavedMovie(item)}
            removeMovie={props.removeMovie}
            isAllMovies={props.isAllMovies}
          />
        ))}
      </ul>
      {props.isAllMovies && props.dataMovies.length > moviesCount && (
        <button
          type="button"
          aria-label="Показать больше"
          className="movies__show-more-btn"
          onClick={getMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
