import React from "react";
import { useState } from "react";
import Form from "../Form/Form";

function Profile(props) {
  const [userInfo, setUserInfo] = useState({
    name: "Андрей",
    email: "pochta@yandex.ru",
  });
  function handleChange(evt) {
    setUserInfo(evt.target.value);
  }
  return (
    <Form
      name="profile"
      userName={userInfo.name}
      title="Привет, "
      ariaLabel="Редактировать профиль"
      buttonText="Редактировать"
      linkPath="/signin"
      linkText="Выйти из аккаунта">
      <label className="form__input-label_profile">
        Имя
        <input
          value={userInfo.name}
          type="text"
          className="form__input-item form__input-item_profile"
          name="name"
          onChange={handleChange}
        />
        <span className="form__item-error email-item-error"></span>
      </label>
      <label className="form__input-label_profile">
        E-mail
        <input
          type="email"
          className="form__input-item form__input-item_profile"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <span className="form__item-error email-item-error"></span>
      </label>
    </Form>
  );
}

export default Profile;
