import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { cookieExpireTime, dynamicLoginForm } from "../../../utils/constants";
import { FormField } from "../../../components/FormFields/FormField";

export const Login = () => {
  const users = useSelector((state) => state.users);

  const loginValidationSchema = yup.object().shape({
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

            for (let i in users) {
              if (users[i].email === value) {
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

            for (let i in users) {
              if (
                users[i].email === this.parent.email &&
                users[i].pass === value
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
    resolver: yupResolver(loginValidationSchema),
    mode: "all",
  });

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["auth_token"]);

  const onSubmit = async (data) => {
    let randomstr = "";
    randomstr +=
      data.email + data.email.split("").reverse().join("") + data.password;

    let auth_data = users.filter(
      (item) => item.email === data.email && item.pass === data.password
    );

    const obj = { ...auth_data[0] };
    obj.token = randomstr;

    auth_data = { ...obj };

    setCookie("auth_token", auth_data, {
      path: "/",
      expires: cookieExpireTime,
    });

    navigate("/transactions");
  };

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login form</h2>
          {Object.keys(dynamicLoginForm).map((input) => (
            <FormField
              key={input}
              errors={errors}
              register={register}
              {...dynamicLoginForm[input]}
            />
          ))}
          <div className="actions">
            <input type="submit" name="submit" value={"Submit"} />
          </div>

          <p>
            Don't have an Account..? <Link to={`/register`}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
