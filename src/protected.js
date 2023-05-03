import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./providers/authprovider";

export const Protected = (props) => {
  const Component = props.component;
  const navigate = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    if (auth.auth === false && auth !== null) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return Component;
};
