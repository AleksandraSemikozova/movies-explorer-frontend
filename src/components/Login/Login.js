import React from 'react';
import Form from '../Form/Form';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Login.css';
import useFormWithValidation from '../../hooks/useFormValidation';

function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function login(evt) {
    evt.preventDefault();
    props.onLogin(values);
    resetForm();
  }
  return (
    <section className="login">
      <Link to="/">
        <img className="form__logo" src={logo} alt="Логотип" />
      </Link>
      <Form
        isPreloader={props.isPreloader}
        name="login"
        title="Рады видеть"
        riaLabel="Войти"
        buttonText="Войти"
        formText="Ещё не зарегистрированы?"
        linkPath="/signup"
        linkText="Регистрация"
        onSubmit={login}
        isValid={isValid}>
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
          />
          <span className="form__item-error email-item-error">
            {errors.email || ''}
          </span>
        </label>
        <label className="form__input-label">
          Пароль
          <input
            type="password"
            className="form__input-item"
            name="password"
            value={values.password || ''}
            onChange={handleChange}
            required
            minLength="8"
          />
          <span className="form__item-error password-error">
            {errors.password || ''}
          </span>
        </label>
      </Form>
    </section>
  );
}

export default Login;
