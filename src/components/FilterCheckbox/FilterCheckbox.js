import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        name=""
        id="short-films"></input>
      <label className="checkbox__label" htmlFor="short-films">
        <span>Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
