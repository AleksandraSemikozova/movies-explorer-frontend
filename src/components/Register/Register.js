import React from 'react';
import Form from '../Form/Form';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Register.css';
import useFormWithValidation from '../../hooks/useFormValidation';

function Register(props) {
  const pathname = useLocation();
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function register(evt) {
    evt.preventDefault();
    props.onRegister(values);
    resetForm();
  }
  return (
    <section className="register">
      <Link to="/">
        <img className="form__logo" src={logo} alt="Логотип" />
      </Link>
      <Form
        onSubmit={register}
        isValid={isValid}
        isPreloader={props.isPreloader}
        name="register"
        title="Добро пожаловать"
        ariaLabel="Зарегистрироваться"
        buttonText="Зарегистрироваться"
        formText="Уже зарегистрированы?"
        linkPath="/signin"
        linkText="Войти">
        <label className="form__input-label">
          Имя
          <input
            type="text"
            className="form__input-item"
            name="name"
            minLength="2"
            pattern="[а-яА-Яa-zA-ZёË\- ]{2,}"
            value={values.name || ''}
            onChange={handleChange}
            disabled={props.isSaving}
            required
          />
          <span className="form__item-error name-item-error">
            {errors.name || ''}
          </span>
        </label>
        <label className="form__input-label">
          E-mail
          <input
            type="email"
            className="form__input-item"
            name="email"
            required
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
            value={values.email || ''}
            onChange={handleChange}
            disabled={props.isSaving}
          />
          <span className="form__item-error email-item-error">
            {errors.email || ''}
          </span>
        </label>
        <label
          className={`form__input-label form__input-label_${props.name}
              ${
                pathname === '/profile'
                  ? 'form__input-label_profile_invisible'
                  : ''
              }`}>
          Пароль
          <input
            type="password"
            className={`form__input-item form__input-item_${props.name}`}
            name="password"
            value={values.password || ''}
            onChange={handleChange}
            required
            minLength="8"
            disabled={props.isSaving}
          />
          <span className="form__item-error password-error">
            {errors.password || ''}
          </span>
        </label>
      </Form>
    </section>
  );
}

export default Register;
