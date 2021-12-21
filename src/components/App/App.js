import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import ErrorIcon from "../../images/Union-not.svg";
import OkIcon from "../../images/Union-yes.svg";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound.js";
import InfoPopup from "../InfoTooltip/InfoTooltip.js";
import Preloader from "../Preloader/Preloader.js";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import { BASE_URL, shortDuration } from "../../utils/constants";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [userMovies, setUserMovies] = useState([]);
  const [resultAllMovies, setResultAllMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isVisibleBlock, setIsVisibleBlock] = useState(false);
  const history = useHistory();
  const locationPath = useLocation();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsloading(true);
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, userMoviesData]) => {
          setCurrentUser(userData);
          localStorage.setItem("userMovies", JSON.stringify(userMoviesData));
          setUserMovies(userMoviesData);
          setUserMovies(JSON.parse(localStorage.getItem("userMovies")));
          setIsVisibleBlock(false);
        })
        .catch(() => history.push("/"))

        .finally(() => setIsloading(false));
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (localStorage.getItem("resultMovies")) {
      setResultAllMovies(JSON.parse(localStorage.getItem("resultMovies")));
    } else {
      getApiMovies();
    }

    if (localStorage.getItem("userMovies")) {
      setUserMovies(JSON.parse(localStorage.getItem("userMovies")));
    } else {
      getSavedMovies();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getApiMovies();
      getSavedMovies();
    }
  }, [isLoggedIn]);

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      mainApi
        .getToken(jwt)
        .then((data) => {
          if (data.email) {
            setIsLoggedIn(true);
            history.push(locationPath.pathname);
          }
        })
        .catch((res) => {
          if (res.status === 400)
            console.log("Токен не передан или передан не в том формате");
          if (res.status === 401) console.log("Переданный токен некорректен");
        });
    }
    history.push("/");
  };

  function handleClickMenu() {
    setIsOpenMenu(true);
  }

  function handleCloseMenu() {
    setIsOpenMenu(false);
  }

  function handleClosePopup() {
    setIsOpenPopup(false);
  }

  const handleRegister = ({ email, password, name }) => {
    setIsloading(true);
    return mainApi
      .register({ email, password, name })
      .then((res) => {
        if (res) {
          setIsOpenPopup(true);
          setInfoMessage("Вы успешно зарегистрировались!");
        }
      })
      .catch((res) => {
        if (res.status === 400) {
          setIsOpenPopup(true);
          setInfoMessage("Некорректно заполнено одно из полей");
        }
        if (res.status === 409) {
          setIsOpenPopup(true);
          setInfoMessage("Пользователь с указанным email уже зарегистрирован");
        } else {
          setIsOpenPopup(true);
          setInfoMessage("Произошла ошибка, повторите пожалуйста позднее.");
        }
      })
      .finally(() => setIsloading(false));
  };

  const handleLogin = ({ email, password }) => {
    setIsloading(true);
    return mainApi
      .authorize({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        history.push("/movies");
        return res;
      })
      .catch((res) => {
        if (res.status === 400) {
          setIsOpenPopup(true);
          setInfoMessage("Не передано одно из полей");
        }
        if (res.status === 401) {
          setIsOpenPopup(true);
          setInfoMessage("Пользователь с указаным email не найден");
        } else {
          setIsOpenPopup(true);
          setInfoMessage("Произошла ошибка, повторите пожалуйста позднее.");
        }
      })
      .finally(() => setIsloading(false));
  };

  const handleUpdateUserProfile = ({ name, email }) => {
    setIsloading(true);
    return mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setIsOpenPopup(true);
        setInfoMessage("Данные успешно обновлены");
      })
      .catch(() => {
        setIsOpenPopup(true);
        setInfoMessage("Произошла ошибка, повторите пожалуйста позднее.");
      })
      .finally(() => setIsloading(false));
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    setResultAllMovies([]);
    setUserMovies([]);
    history.push("/signin");
  };

  // фуекция сохранения всех фильмов в локальное хранилище
  const getApiMovies = () => {
    setIsloading(true);
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
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch(() => {
        setIsOpenPopup(true);
        setInfoMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      })
      .finally(() => setIsloading(false));
  };

  // функция поиска фильмов
  const handleSearchMovie = (inputValue) => {
    getApiMovies();
    setIsVisibleBlock(false);
    const movies = JSON.parse(localStorage.getItem("movies"));
    const results = movies.filter((movie) => {
      return JSON.stringify(movie.nameRU || movie.nameEN)
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });
    showNoFoundBlock(results);
    setResultAllMovies(results);
    localStorage.setItem("resultMovies", JSON.stringify(results));
  };

  // функция для отображеия блока "ничего не найдено"
  const showNoFoundBlock = (movies) => {
    if (movies.length === 0) {
      setIsVisibleBlock(true);
    } else {
      setIsVisibleBlock(false);
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
      setResultAllMovies(JSON.parse(localStorage.getItem("resultMovies")));
    }
  };

  // функция поиска фильмов из сохраненных
  const handleSearchUserMovie = (inputValue) => {
    const movies = JSON.parse(localStorage.getItem("userMovies"));
    const results = movies.filter((movie) => {
      return JSON.stringify(movie)
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });
    setUserMovies(results);
    showNoFoundBlock(results);
  };

  // функция для распознования сохраненнёх фильмов
  const isSavedMovie = (movie) =>
    userMovies.some((item) => item.movieId === movie.movieId);

  // функция нажатия на иконку сохранения фильма
  const handleClickMovie = (movie) => {
    const movies = JSON.parse(localStorage.getItem("userMovies"));
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

  const handleSaveMovie = (item) => {
    mainApi
      .saveMovie(item)
      .then((movie) => {
        const moviesUser = JSON.parse(localStorage.getItem("userMovies"));
        const newArr = [...moviesUser, { ...movie, id: movie.movieId }];
        localStorage.setItem("userMovies", JSON.stringify(newArr));
        setUserMovies(newArr);
      })
      .catch(() => {
        setIsOpenPopup(true);
        setInfoMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      });
    getSavedMovies();
  };

  // показать сохраненные фильмы из апи
  const getSavedMovies = () => {
    setIsloading(true);
    mainApi
      .getSavedMovies()
      .then((res) => {
        const movies = res.map((movie) => ({ ...movie, id: movie.movieId }));
        localStorage.setItem("userMovies", JSON.stringify(movies));
        setUserMovies(JSON.parse(localStorage.getItem("userMovies")));
      })
      .catch(() => {
        setIsOpenPopup(true);
        setInfoMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      })
      .finally(() => setIsloading(false));
  };

  // функция фильтрации по длительности из сохранённых фильмов
  const handleFilterShortUserMovie = () => {
    if (!isChecked) {
      setIsChecked(!isChecked);
      const movies = JSON.parse(localStorage.getItem("userMovies"));
      const shortMovies = movies.filter((movie) => {
        return movie.duration < shortDuration;
      });
      setUserMovies(shortMovies);
    } else {
      setIsChecked(!isChecked);
      getSavedMovies();
      setUserMovies(JSON.parse(localStorage.getItem("userMovies")));
    }
  };

  // функция удаления фильма
  const handleRemoveMovie = (film) => {
    const movies = JSON.parse(localStorage.getItem("userMovies"));
    const movie = movies.find(
      (item) => item.id === film.id || item.id === film.movieId
    );
    if (movie._id) {
      mainApi
        .deleteMovie(movie._id)
        .then((res) => {
          const newArr = movies.filter((item) => item.movieId !== res.movieId);
          setUserMovies(newArr);
          if (newArr.length === 0) {
            setIsVisibleBlock(true);
          } else {
            setIsVisibleBlock(false);
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
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={isLoggedIn}
            component={Movies}
            movies={resultAllMovies}
            searchFunction={handleSearchMovie}
            saveMovie={handleClickMovie}
            isSavedMovie={isSavedMovie}
            isLoading={isLoading}
            filter={handleFilterShortMovie}
            isChecked={isChecked}
            isVisible={isVisibleBlock}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={isLoggedIn}
            component={SavedMovies}
            movies={userMovies}
            isLoading={isLoading}
            removeMovie={handleRemoveMovie}
            searchFunction={handleSearchUserMovie}
            isSavedMovie={isSavedMovie}
            filter={handleFilterShortUserMovie}
            isChecked={isChecked}
            isVisible={isVisibleBlock}
          />

          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={isLoggedIn}
            component={Profile}
            data={currentUser}
            onLogOut={handleLogOut}
            onSubmit={handleUpdateUserProfile}
            isLoading={isLoading}
          />
          <Route exact path="/signin">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login onLogin={handleLogin} isLoading={isLoading} />
            )}
          </Route>
          <Route exact path="/signup">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register onRegister={handleRegister} isLoading={isLoading} />
            )}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoPopup
          message={infoMessage}
          isOpen={isOpenPopup}
          onClose={handleClosePopup}
        />
        <Preloader isLoading={isLoading} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
