import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  component: JSX.Element;
  isProtectedRoute: boolean;
};

export const Protected = ({ component, isProtectedRoute }: ProtectedProps) => {
  const Component = component;
  const isProtected = isProtectedRoute;

  const cookie = new Cookies();
  let auth_token = cookie.get("auth_token");

  let fieldblock = <></>;

  if (isProtected) {
    if (auth_token) {
      fieldblock = Component;
    } else {
      fieldblock = <Navigate to={"/login"} />;
    }
  } else {
    if (auth_token) {
      fieldblock = <Navigate to={"/transactions"} />;
    } else {
      fieldblock = Component;
    }
  }

  return fieldblock;
};
