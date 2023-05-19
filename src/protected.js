import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export const Protected = (props) => {
  const Component = props.component;
  const isProtected = props.protected;

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
