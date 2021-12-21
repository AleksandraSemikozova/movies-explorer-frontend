import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        name="checkbox"
        id="short-films"
        checked={props.isChecked}
        onChange={props.onChange}></input>
      <label className="checkbox__label" htmlFor="short-films">
        <span>Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
