import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { useEffect } from 'react';

function SavedMovies(props) {
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('userMovies')) || [];
    props.setMovies(movies);
  }, []);

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        searchFunction={props.searchFunction}
        filter={props.filter}
        isChecked={props.isChecked}
      />
      <MoviesCardList
        loggedIn={props.loggedIn}
        dataMovies={props.movies}
        isSavedMovie={props.isSavedMovie}
        removeMovie={props.removeMovie}
        isAllMovies={false}
        isSavedMoviesList={true}
      />
      {props.isVisible && props.movies.length === 0 && (
        <p className="saved-movies__error-block">Ничего не найдено</p>
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;
