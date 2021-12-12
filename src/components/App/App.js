import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import ErrorIcon from "../../images/Union-not.svg";
import OkIcon from "../../images/Union-yes.svg";
import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";

function App() {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ iconPath: "", text: "" });

  function closePopup() {
    setIsTooltipOpen(false);
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closePopup}
        message={message}
      />
    </div>
  );
}

export default App;
