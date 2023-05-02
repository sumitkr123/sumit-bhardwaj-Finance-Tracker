import { useNavigate } from "react-router-dom";
import "./css/login.css";
import { useAuth } from "../../../providers/authprovider";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();

  let auth = useAuth();

  useEffect(() => {
    let auth_token = JSON.parse(localStorage.getItem("auth_token"));

    if (auth_token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const login = (e) => {
    e.preventDefault();

    let existingData = JSON.parse(localStorage.getItem("all_users_data"));

    if (existingData) {
      let form = e.target;
      let randomstr = "";
      randomstr +=
        form.email.value +
        form.email.value.split("").reverse().join("") +
        form.password.value;

      let flag = 0;
      for (let i in existingData) {
        if (
          existingData[i].email === form.email.value &&
          existingData[i].pass === form.password.value
        ) {
          flag = 1;
          break;
        }
      }

      if (flag === 1) {
        let auth_data = {};
        auth_data["token"] = randomstr;
        auth_data["email"] = form.email.value;
        auth_data["pass"] = form.password.value;

        console.log(auth_data);

        localStorage.setItem("auth_token", JSON.stringify(auth_data));
        auth.setAuth(true);
        navigate("/");
      } else {
        alert("Email or Password is incorrect..!");
      }
    } else {
      navigate("/register");
    }
  };

  return (
    <>
      <div className="container">
        <div className="loginform">
          <h1>Login Page</h1>

          <br></br>
          <br></br>
          <form onSubmit={(e) => login(e)}>
            <div className="inputs">
              Email :- <input type="text" name="email" required />
              <br></br>
              <br></br>
              Password :- <input type="text" name="password" required />
            </div>
            <br></br>

            <input type="submit" name="submit" value={"Login"} />
          </form>
        </div>
      </div>
    </>
  );
};
