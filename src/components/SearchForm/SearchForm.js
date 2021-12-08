import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-movies">
      <form className="search-movies__form">
        <input
          className="search-movies__input"
          type="text"
          name="search-movie"
          placeholder="Фильм"
          required
        />
        <button
          className="search-movies__btn"
          type="submit"
          aria-label="Найти"
        />
      </form>

      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
