import { useEffect, useState } from "react";
import { Switch, Route } from "react-router";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Routes = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@Kehub:token"));

    if (token) {
      return setAuthorized(true);
    }
  }, [authorized]);

  return (
    <Switch>
      <Route exact path="/">
        <Home authorized={authorized} />
      </Route>

      <Route path="/login">
        <Login authorized={authorized} setAuthorized={setAuthorized} />
      </Route>

      <Route path="/signup">
        <Signup authorized={authorized} />
      </Route>

      <Route path="/dashboard">
        <Dashboard authorized={authorized} setAuthorized={setAuthorized} />
      </Route>
    </Switch>
  );
};

export default Routes;
