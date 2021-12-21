import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
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
      />
      <Footer />
    </>
  );
}

export default Movies;
