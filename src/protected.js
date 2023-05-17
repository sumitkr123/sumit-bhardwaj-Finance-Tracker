import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export const Protected = (props) => {
  const Component = props.component;
  const isPublic = props.public;

  const cookie = new Cookies();
  let auth_token = cookie.get("auth_token");

  if (isPublic) {
    if (!auth_token) {
      return Component;
    } else {
      return <Navigate to={"/transactions"} />;
    }
  } else {
    if (auth_token) {
      return Component;
    } else {
      return <Navigate to="/login" />;
    }
  }
};
