import React from "react";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  component: React.JSX.Element;
  isProtectedRoute: boolean;
};

export const Protected = ({
  component,
  isProtectedRoute,
}: ProtectedProps): React.JSX.Element => {
  const Component = component;
  const isProtected = isProtectedRoute;

  const cookie = new Cookies();
  let auth_token = cookie.get("auth_token");

  let fieldblock: React.JSX.Element = <></>;

  if (isProtected) {
    if (auth_token) {
      fieldblock = Component;
    } else {
      fieldblock = <Navigate to={"/login"} />;
    }
  } else {
    if (auth_token) {
      fieldblock = <Navigate to={"/"} />;
    } else {
      fieldblock = Component;
    }
  }

  return fieldblock;
};
