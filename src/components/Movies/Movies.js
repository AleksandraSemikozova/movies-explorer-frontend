import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "../MoviesCardList/MoviesCardList.css";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect } from "react";

function Movies(props) {
  useEffect(() => {
    console.log("movies props", props);
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
        dataMovies={props.movies}
        saveMovie={props.saveMovie}
        isSavedMovie={props.isSavedMovie}
        isAllMovies={true}
        isSavedMoviesList={false}
      />
      {props.isVisible && props.movies.length === 0 && (
        <p className="movies__error-block">Ничего не найдено</p>
      )}
      <Footer />
    </>
  );
}

export default Movies;
