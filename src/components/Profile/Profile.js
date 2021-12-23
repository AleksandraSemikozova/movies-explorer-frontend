import React from 'react';
import { useEffect, useContext } from 'react';
import Form from '../Form/Form';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormValidation';

function Profile(props) {
  const { values, setValues, handleChange, errors } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  function updateProfile(evt) {
    evt.preventDefault();
    props.onSubmit(values);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="profile">
        <Form
          click={props.onSignOut}
          isPreloader={props.isPreloader}
          onSubmit={updateProfile}
          name="profile"
          userName={currentUser.name}
          title="Привет, "
          ariaLabel="Редактировать профиль"
          buttonText="Редактировать"
          linkPath="/signin"
          linkText="Выйти из аккаунта">
          <label className="form__input-label_profile">
            Имя
            <input
              value={values.name}
              type="text"
              className="form__input-item form__input-item_profile"
              name="name"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
            />
            <span className="form__item-error name-item-error">
              {errors.name || ''}
            </span>
          </label>
          <label className="form__input-label_profile">
            E-mail
            <input
              type="email"
              className="form__input-item form__input-item_profile"
              name="email"
              required
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              value={values.email}
              onChange={handleChange}
            />
            <span className="form__item-error email-item-error">
              {errors.email || ''}
            </span>
          </label>
        </Form>
      </section>
    </>
  );
}

export default Profile;
