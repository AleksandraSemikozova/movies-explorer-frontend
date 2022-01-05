import { Link } from 'react-router-dom';
import './Form.css';
import useFormWithValidation from '../../hooks/useFormValidation.js';

function Form(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  return (
    <section className="form">
      <h2 className="form__title">
        {props.title}
        <span>{props.userName}!</span>
      </h2>
      <form
        action="#"
        name={props.name}
        onSubmit={props.onSubmit}
        onSignOut={props.onSignOut}
        className="form__container">
        <div>
          <fieldset className="form__input-container">
            {props.children}
          </fieldset>
        </div>
        <div className="form__button-container">
          <button
            type="submit"
            aria-label={props.ariaLabel}
            className={`form__submit-btn form__submit-btn_${props.name} 
            form__submit-btn ${
              props.isValid ? 'form__submit-btn' : 'form__submit-btn_disabled'
            }`}>
            {props.buttonText}
          </button>
          <p className="form__text">
            {props.formText}
            <Link
              onClick={props.click}
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
