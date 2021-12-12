import React from "react";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register(props) {
  return (
    <section className="register">
      <Link to="/">
        <img className="form__logo" src={logo} alt="Логотип" />
      </Link>
      <Form
        name="register"
        title="Добро пожаловать"
        ariaLabel="Зарегистрироваться"
        buttonText="Зарегистрироваться"
        formText="Уже зарегистрированы?"
        linkPath="/signin"
        linkText="Войти">
        <label className="form__input-label">
          Имя
          <input type="text" className="form__input-item" name="name" />
          <span className="form__item-error email-item-error"></span>
        </label>
        <label className="form__input-label">
          E-mail
          <input type="email" className="form__input-item" name="email" />
          <span className="form__item-error email-item-error"></span>
        </label>
      </Form>
    </section>
  );
}

export default Register;
