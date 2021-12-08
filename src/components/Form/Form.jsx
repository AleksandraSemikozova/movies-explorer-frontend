import { Link, useLocation } from "react-router-dom";
import "./Form.css";
import Header from "../Header/Header";

function Form(props) {
  const { pathname } = useLocation();
  return (
    <section className="form">
      <Header />

      <h2 className="form__title">
        {props.title}
        <span>{props.userName}!</span>
      </h2>
      <form action="#" name={props.name} className="form__container">
        <div>
          <fieldset className="form__input-container">
            {props.children}
            <label
              className={`form__input-label form__input-label_${props.name}
              ${
                pathname === "/profile"
                  ? "form__input-label_profile_invisible"
                  : ""
              }`}>
              Имя
              <input type="text" className="form__input-item" name="name" />
              <span className="form__item-error email-item-error"></span>
            </label>
            <label
              className={`form__input-label form__input-label_${props.name}
              ${
                pathname === "/profile"
                  ? "form__input-label_profile_invisible"
                  : ""
              }`}>
              Пароль
              <input
                type="password"
                className={`form__input-item form__input-item_${props.name}`}
                name="password"
              />
              <span className="form__item-error password-error"></span>
            </label>
          </fieldset>
        </div>
        <div className="form__button-container">
          <button
            type="submit"
            aria-label={props.ariaLabel}
            className={`form__submit-btn form__submit-btn_${props.name}`}>
            {props.buttonText}
          </button>
          <p className="form__text">
            {props.formText}
            <Link
              className={`form__link form__link_${props.name}`}
              to={props.linkPath}>
              {props.linkText}
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Form;
