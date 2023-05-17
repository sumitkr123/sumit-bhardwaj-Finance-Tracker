import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {
  let existingData = JSON.parse(localStorage.getItem("all_users_data"));
  
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .test({
        name: "email",
        skipAbsent: true,
        test(value, ctx) {
          if (value.trim() === "") {
            return ctx.createError({
              message: `**Email can't be empty..!`,
            });
          } else {
            let flag = 0;

            for (let i in existingData) {
              if (existingData[i].email === value) {
                flag = 1;
                break;
              }
            }

            if (flag == 0) {
              return ctx.createError({
                message: `**Email doesn't exist..!`,
              });
            }
          }
          return true;
        },
      }),
    password: yup
      .string()
      .trim()
      .test({
        name: "password",
        skipAbsent: true,
        test(value, ctx) {
          if (value.trim() === "") {
            return ctx.createError({
              message: `**Password can't be empty..!`,
            });
          } else {
            let flag = 0;

            for (let i in existingData) {
              if (
                existingData[i].email === this.parent.email &&
                existingData[i].pass === value
              ) {
                flag = 1;
                break;
              }
            }

            if (flag == 0) {
              return ctx.createError({
                message: `**Password doesn't match..!`,
              });
            }
          }
          return true;
        },
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let randomstr = "";
    randomstr +=
      data.email + data.email.split("").reverse().join("") + data.password;

    let flag = 0;
    let auth_data = {};

    for (let i in existingData) {
      if (
        existingData[i].email === data.email &&
        existingData[i].pass === data.password
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
  };

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login form</h2>
          <br></br>
          <br></br>
          <label>Email :-</label>
          <input type="email" className="forminputs" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email?.message}</p>
          )}
          <br />
          <br />
          <label>Password :-</label>
          <input
            type="password"
            className="forminputs"
            {...register("password")}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          )}
          <br />
          <br />
          <div className="actions">
            <input type="submit" name="submit" value={"Submit"} />
          </div>
          <br />
          <br />
          Don't have an Account..? <Link to={`/register`}>Sign up</Link>
        </form>
      </div>
    </div>
  );
};
