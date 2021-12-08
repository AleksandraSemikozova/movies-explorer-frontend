import React from "react";
import Form from "../Form/Form";

function Register(props) {
  return (
    <Form
      name="register"
      title="Добро пожаловать"
      ariaLabel="Зарегистрироваться"
      buttonText="Зарегистрироваться"
      formText="Уже зарегистрированы?"
      linkPath="/signin"
      linkText="Войти">
      <label className="form__input-label">
        E-mail
        <input type="email" className="form__input-item" name="email" />
        <span className="form__item-error email-item-error"></span>
      </label>
    </Form>
  );
}

export default Register;
