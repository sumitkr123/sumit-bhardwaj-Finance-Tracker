import { Link, useNavigate } from "react-router-dom";
import "./css/login.css";

export const Login = () => {
  const navigate = useNavigate();

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
      let auth_data = {};

      for (let i in existingData) {
        if (
          existingData[i].email === form.email.value &&
          existingData[i].pass === form.password.value
        ) {
          auth_data = existingData[i];
          flag = 1;
          break;
        }
      }

      if (flag === 1) {
        auth_data["token"] = randomstr;
        localStorage.setItem("auth_token", JSON.stringify(auth_data));
        navigate("/transactions");
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
          <div className="logincontent">
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
              <br></br>
              <br></br>
              <h3>
                Don't have an account..! <Link to={"/register"}>Sign-up</Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
