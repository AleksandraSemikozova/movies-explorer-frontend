import { Route, Switch } from "react-router";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        {/* <Route path="/saved-movies" exact>
          <Header />
          <Movies />
          <Footer />
        </Route>
        <Route path="/profile" exact>
          <Header />
          <Profile />
        </Route>
        <Route path="/signin" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Register />
        </Route>
        <Route path="*" exact>
          <NotFound />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
