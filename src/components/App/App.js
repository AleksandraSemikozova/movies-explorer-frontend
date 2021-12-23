import React, { useState, useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import ErrorIcon from '../../images/Union-not.svg';

import OkIcon from '../../images/Union-yes.svg';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound.js';
import InfoPopup from '../InfoTooltip/InfoTooltip.js';
import Preloader from '../Preloader/Preloader.js';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import { BASE_URL, shortDuration } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [loggedIn, setLoggedIn] = useState();
  const [userMovies, setUserMovies] = useState([]);
  const [resultAllMovies, setResultAllMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [errorBlock, setErrorBlock] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [message, setMessage] = React.useState([]);
  const [icon, setIcon] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);

  const history = useHistory();
  const pathname = useLocation();

  useEffect(() => {
    setIsPreloader(true);
    Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([userInfo, userMoviesData]) => {
        setCurrentUser(userInfo);
        localStorage.setItem('userMovies', JSON.stringify(userMoviesData));
        setUserMovies(userMoviesData);
        setUserMovies(JSON.parse(localStorage.getItem('userMovies')));
        setErrorBlock(false);
      })
      .catch(() => history.push('/'))

      .finally(() => setIsPreloader(false));
  }, [loggedIn, history]);

  useEffect(() => {
    if (localStorage.getItem('resultMovies')) {
      setResultAllMovies(JSON.parse(localStorage.getItem('resultMovies')));
    } else {
      getApiMovies();
    }

    if (localStorage.getItem('userMovies')) {
      setUserMovies(JSON.parse(localStorage.getItem('userMovies')));
    } else {
      getSavedMovies();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getApiMovies();
      getSavedMovies();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      mainApi
        .getToken(jwt)
        .then((data) => {
          if (data.email) {
            setLoggedIn(true);
            history.push(pathname.pathname);
          }
        })
        .catch((res) => {
          if (res.status === 400)
            console.log('Токен не передан или передан не в том формате');
          if (res.status === 401) console.log('Переданный токен некорректен');
        });
    }
  }, [history]);

  function handleInfoTooltipOpen() {
    setIsTooltipOpen(true);
  }
  function handleInfoTooltipClose() {
    setIsTooltipOpen(false);
  }

  function handleInfoTooltipContent(iconPath, text) {
    setMessage([text]);
    setIcon([iconPath]);
  }

  function registration({ email, password, name }) {
    setIsPreloader(true);
    mainApi
      .register({ email, password, name })
      .then((res) => {
        if (res) {
          handleInfoTooltipContent(OkIcon, 'Вы успешно зарегистрировались!');
          handleInfoTooltipOpen();
          setTimeout(history.push, 3000, '/signin');
          setTimeout(handleInfoTooltipClose, 2500);
        }
      })
      .catch((res) => {
        if (res.status === 400) {
          handleInfoTooltipContent(
            ErrorIcon,
            'Некорректно заполнено одно из полей!'
          );
          handleInfoTooltipOpen();
          setTimeout(handleInfoTooltipClose, 2500);
        }
        if (res.status === 409) {
          handleInfoTooltipContent(
            ErrorIcon,
            'Пользователь с указанным email уже зарегистрирован'
          );
          handleInfoTooltipOpen();
          setTimeout(handleInfoTooltipClose, 2500);
        } else {
          handleInfoTooltipContent(
            ErrorIcon,
            'Произошла ошибка, повторите пожалуйста позднее.'
          );
          handleInfoTooltipOpen();
          setTimeout(handleInfoTooltipClose, 2500);
        }
      })
      .finally(() => setIsPreloader(false));
  }

  function authorization({ email, password }) {
    setIsPreloader(true);
    mainApi
      .authorize({ email, password })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res);
        history.push('/movies');
        return res;
      })
      .catch((res) => {
        if (res.status === 400) {
          handleInfoTooltipContent(
            ErrorIcon,
            'Некорректно заполнено одно из полей!'
          );
          handleInfoTooltipOpen();
          setTimeout(handleInfoTooltipClose, 2500);
        }
        if (res.status === 401) {
          handleInfoTooltipContent(
            ErrorIcon,
            'Пользователь с указаным email не найден'
          );
          handleInfoTooltipOpen();
          setTimeout(handleInfoTooltipClose, 2500);
        } else {
          handleInfoTooltipContent(
            ErrorIcon,
            'Произошла ошибка, повторите пожалуйста позднее.'
          );
          handleInfoTooltipOpen();
          setTimeout(handleInfoTooltipClose, 2500);
        }
      })
      .finally(() => setIsPreloader(false));
  }

  function handleUpdateUserProfile({ name, email }) {
    setIsPreloader(true);
    mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);

        handleInfoTooltipContent(OkIcon, 'Данные успешно обновлены');
        handleInfoTooltipOpen();

        setTimeout(handleInfoTooltipClose, 2500);
      })
      .catch(() => {
        handleInfoTooltipContent(
          ErrorIcon,
          'Произошла ошибка, повторите пожалуйста позднее.'
        );
        handleInfoTooltipOpen();
        setTimeout(handleInfoTooltipClose, 2500);
      })
      .finally(() => setIsPreloader(false));
  }

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.clear();
    setResultAllMovies([]);
    setUserMovies([]);
    history.push('/signin');
  };

  // фуекция сохранения всех фильмов в локальное хранилище
  function getApiMovies() {
    setIsPreloader(true);
    moviesApi
      .getMovies()
      .then((data) => {
        const movies = data.map((movie) => ({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `${BASE_URL}${movie.image.url}`,
          trailer: movie.trailerLink,
          thumbnail: `${BASE_URL}${movie.image.url}`,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          movieId: movie.id,
        }));
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch(() => {
        handleInfoTooltipContent(
          ErrorIcon,
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
        );
        handleInfoTooltipOpen();
      })
      .finally(() => setIsPreloader(false));
  }

  // функция поиска фильмов
  const handleSearchMovie = (inputValue) => {
    getApiMovies();
    setErrorBlock(false);
    const movies = JSON.parse(localStorage.getItem('movies'));
    const results = movies.filter((movie) => {
      return JSON.stringify(movie.nameRU || movie.nameEN)
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });
    showNoFoundBlock(results);
    setResultAllMovies(results);
    localStorage.setItem('resultMovies', JSON.stringify(results));
  };

  // функция для отображеия блока "ничего не найдено"
  const showNoFoundBlock = (movies) => {
    if (movies.length === 0) {
      setErrorBlock(true);
    } else {
      setErrorBlock(false);
    }
  };

  // функция фильтрации по длительности
  const handleFilterShortMovie = () => {
    if (!isChecked) {
      setIsChecked(!isChecked);
      const shortMovies = resultAllMovies.filter((movie) => {
        return movie.duration < shortDuration;
      });
      setResultAllMovies(shortMovies);
    } else {
      setIsChecked(!isChecked);
      setResultAllMovies(JSON.parse(localStorage.getItem('resultMovies')));
    }
  };

  // функция поиска фильмов из сохраненных
  const handleSearchUserMovie = (inputValue) => {
    const movies = JSON.parse(localStorage.getItem('userMovies'));
    const results = movies.filter((movie) => {
      const searchResult =
        JSON.stringify(movie.nameRU)
          .toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        JSON.stringify(movie.nameEN)
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      if (searchResult) {
        return searchResult;
      }
    });
    setUserMovies(results);
    showNoFoundBlock(results);
  };

  // функция для распознования сохраненнёх фильмов
  const isSavedMovie = (movie) =>
    userMovies.some((item) => item.movieId === movie.movieId);

  // функция нажатия на иконку сохранения фильма
  const handleClickMovie = (movie) => {
    const movies = JSON.parse(localStorage.getItem('userMovies'));
    const checkedMovie = movies.filter(
      (item) => item.movieId === movie.movieId
    )[0];
    if (!isSavedMovie(movie)) {
      handleSaveMovie(movie);
    } else {
      handleRemoveMovie(checkedMovie);
    }
  };

  // функция сохранения фильмов

  function handleSaveMovie(item) {
    mainApi
      .saveMovie(item)
      .then((movie) => {
        const moviesUser = JSON.parse(localStorage.getItem('userMovies'));
        const newArr = [...moviesUser, { ...movie, id: movie.movieId }];
        localStorage.setItem('userMovies', JSON.stringify(newArr));
        setUserMovies(newArr);
      })
      .catch(() => {
        handleInfoTooltipContent(
          ErrorIcon,
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
        );
        handleInfoTooltipOpen();
      });
    getSavedMovies();
  }

  // показать сохраненные фильмы из апи
  function getSavedMovies() {
    setIsPreloader(true);
    mainApi
      .getSavedMovies()
      .then((res) => {
        const movies = res.map((movie) => ({ ...movie, id: movie.movieId }));
        localStorage.setItem('userMovies', JSON.stringify(movies));
        setUserMovies(JSON.parse(localStorage.getItem('userMovies')));
      })
      .catch(() => {
        handleInfoTooltipContent(
          ErrorIcon,
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
        );
        handleInfoTooltipOpen();
      })
      .finally(() => setIsPreloader(false));
  }

  // функция фильтрации по длительности из сохранённых фильмов
  const handleFilterShortUserMovie = () => {
    if (!isChecked) {
      setIsChecked(!isChecked);
      const movies = JSON.parse(localStorage.getItem('userMovies'));
      const shortMovies = movies.filter((movie) => {
        return movie.duration < shortDuration;
      });
      setUserMovies(shortMovies);
    } else {
      setIsChecked(!isChecked);
      getSavedMovies();
      setUserMovies(JSON.parse(localStorage.getItem('userMovies')));
    }
  };

  // функция удаления фильма
  const handleRemoveMovie = (film) => {
    const movies = JSON.parse(localStorage.getItem('userMovies'));
    const movie = movies.find(
      (item) => item.id === film.id || item.id === film.movieId
    );
    if (movie._id) {
      mainApi
        .deleteMovie(movie._id)
        .then((res) => {
          const newArr = movies.filter((item) => item._id !== movie._id);
          setUserMovies(newArr);
          if (newArr.length === 0) {
            setErrorBlock(true);
          } else {
            setErrorBlock(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={resultAllMovies}
            searchFunction={handleSearchMovie}
            saveMovie={handleClickMovie}
            isSavedMovie={isSavedMovie}
            isPreloader={isPreloader}
            filter={handleFilterShortMovie}
            isChecked={isChecked}
            isVisible={errorBlock}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            movies={userMovies}
            isPreloader={isPreloader}
            removeMovie={handleRemoveMovie}
            searchFunction={handleSearchUserMovie}
            isSavedMovie={isSavedMovie}
            filter={handleFilterShortUserMovie}
            isChecked={isChecked}
            isVisible={errorBlock}
          />

          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            data={currentUser}
            onSignOut={handleSignOut}
            onSubmit={handleUpdateUserProfile}
            isPreloader={isPreloader}
          />
          <Route exact path="/signin">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login onLogin={authorization} isPreloader={isPreloader} />
            )}
          </Route>
          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register onRegister={registration} isPreloader={isPreloader} />
            )}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoPopup
          icon={icon}
          message={message}
          isOpen={isTooltipOpen}
          onClose={handleInfoTooltipClose}
        />
        <Preloader isPreloader={isPreloader} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
