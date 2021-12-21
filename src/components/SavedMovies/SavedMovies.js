import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
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
        isSavedMovie={props.isSavedMovie}
        removeMovie={props.removeMovie}
        isAllMovies={false}
      />
      {props.isVisible && props.movies.length === 0 && (
        <p className="saved-movies__nofound-msg">Ничего не найдено</p>
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;
