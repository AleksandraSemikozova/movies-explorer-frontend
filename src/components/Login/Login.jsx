import React from "react";
import Form from "../Form/Form";

function Login(props) {
  return (
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
  );
}

export default Login;
