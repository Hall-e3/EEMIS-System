import React from "react";
import { Redirect, Route } from "react-router-dom";
export default function AuthenticationRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          window.localStorage.getItem("auth_token") === null ||
          window.localStorage.getItem("auth_token") === undefined
        ) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    ></Route>
  );
}
