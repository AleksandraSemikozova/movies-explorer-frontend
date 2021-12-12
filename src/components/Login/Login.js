import React from "react";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";

function Login(props) {
  return (
    <section className="login">
      <Link to="/">
        <img className="form__logo" src={logo} alt="Логотип" />
      </Link>
      <Form
        name="login"
        title="Рады видеть"
        riaLabel="Войти"
        buttonText="Войти"
        formText="Ещё не зарегистрированы?"
        linkPath="/signup"
        linkText="Регистрация">
        <label className="form__input-label">
          E-mail
          <input type="email" className="form__input-item" name="email" />
          <span className="form__item-error email-item-error"></span>
        </label>
      </Form>
    </section>
  );
}

export default Login;
