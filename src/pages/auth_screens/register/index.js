import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/register.css";

export const Register = () => {
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    let existingData = JSON.parse(localStorage.getItem("all_users_data"));

    let form = e.target;

    let user_data = {};
    if (existingData) {
      let flag = 0;
      for (let i in existingData) {
        if (existingData[i].email === form.email.value) {
          flag = 1;
          break;
        }
      }

      if (flag === 1) {
        alert("Email already exists..!");
      } else {
        user_data["id"] = existingData[existingData.length - 1].id + 1;
        user_data["name"] = form.name.value;
        user_data["phone"] = form.phone.value;
        user_data["email"] = form.email.value;
        user_data["pass"] = form.password.value;

        existingData.push(user_data);

        localStorage.setItem("all_users_data", JSON.stringify(existingData));

        navigate("/login");
      }
    } else {
      user_data["id"] = 1;
      user_data["name"] = form.name.value;
      user_data["phone"] = form.phone.value;
      user_data["email"] = form.email.value;
      user_data["pass"] = form.password.value;

      localStorage.setItem("all_users_data", JSON.stringify([user_data]));

      navigate("/login");
    }
  };
  return (
    <>
      <div className="container">
        <div className="registerform">
          <div className="registercontent">
            <h1>Register Page</h1>

            <br></br>
            <br></br>
            <form onSubmit={(e) => register(e)}>
              <div className="inputs">
                Name :- <input type="text" name="name" required />
                <br></br>
                <br></br>
                Phone no. :- <input type="text" name="phone" required />
                <br></br>
                <br></br>
                Email :- <input type="text" name="email" required />
                <br></br>
                <br></br>
                Password :- <input type="text" name="password" required />
              </div>
              <br></br>

              <input type="submit" name="submit" value={"Register"} />
              <br></br>
              <br></br>
              <h3>
                Already have an account..! <Link to={"/login"}>Sign-in</Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
