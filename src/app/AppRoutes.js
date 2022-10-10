import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthenticationRoute } from "./components";
import Spinner from "../app/shared/Spinner";

const Login = lazy(() => import("../views/Login"));
const Register = lazy(() => import("../views/Register"));
const Profile = lazy(() => import("../views/Profile"));

const BasicElements = lazy(() => import("./form-elements/BasicElements"));
const WorkProfile = lazy(() => import("./form-elements/Workers"));

function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <AuthenticationRoute exact path="/dashboard" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <AuthenticationRoute path="/worker/edit" component={BasicElements} />
        <AuthenticationRoute
          path="/worker-form/profile"
          component={WorkProfile}
        />

        <Redirect to="/profile" />
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;
