import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Home = React.lazy(() => import("../pages/home"));
const Login = React.lazy(() => import("../pages/user/login"));
const Profile = React.lazy(() => import("../pages/user/profile"));
const LoginSuccess = React.lazy(() => import("../pages/user/loginSuccess"));
// const Register = React.lazy(() => import("../pages/user/register"));
const RecipeInfo = React.lazy(() => import("../pages/recipe/info"));

const Routes = () => {
  const auth = useContext(AuthContext);
  let availableRoutes;

  if (auth.isLoggedIn) {
    availableRoutes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/recipe/:recipeId" exact>
          <RecipeInfo />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    availableRoutes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {/* <Route path="/register" exact>
          <Register />
        </Route> */}
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/recipe/:recipeId" exact>
          <RecipeInfo />
        </Route>
        <Route path="/login/success" exact>
          <LoginSuccess />
        </Route>
        <Route path="/user/google" exact></Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return availableRoutes;
};

export default Routes;
