import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormWithValidation from "../../hooks/useFormValidation";

function SearchForm(props) {
  const { values, handleChange, errors } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.searchFunction(values.movies);
  }

  return (
    <section className="search-movies">
      <form className="search-movies__form" onSubmit={handleSubmit}>
        <input
          className="search-movies__input"
          type="text"
          name="movies"
          placeholder="Фильм"
          required
          value={values.movies || ""}
          onChange={handleChange}
        />
        <span className="search-movies__item-error search-movies-item-error">
          {errors.movies ? "Нужно ввести ключевое слово" : ""}
        </span>
        <button
          className="search-movies__btn"
          type="submit"
          aria-label="Найти"
        />
      </form>

      <FilterCheckbox isChecked={props.isChecked} onChange={props.filter} />
    </section>
  );
}

export default SearchForm;
