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

  if (isProtected) {
    if (auth_token) {
      return Component;
    } else {
      return <Navigate to={"/login"} />;
    }
  } else {
    if (auth_token) {
      return <Navigate to={"/transactions"} />;
    } else {
      return Component;
    }
  }
};
