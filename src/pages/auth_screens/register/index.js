import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  mailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
} from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/ducks/users_slice";

export const Register = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(`**Name can't be empty..!`)
      .matches(nameRegex, { message: `**Please enter valid name..!` }),
    phone: yup
      .string()
      .trim()
      .required(`**Phone no. can't be empty..!`)
      .matches(phoneRegex, { message: `**Please enter valid number..!` }),
    email: yup
      .string()
      .trim()
      .required(`**Email can't be empty..!`)
      .matches(mailRegex, { message: `**Please enter valid email..!` })
      .test({
        name: "email",
        skipAbsent: true,
        test(value, ctx) {
          let flag = 0;

          for (let i in users) {
            if (users[i].email === value) {
              flag = 1;
              break;
            }
          }

          if (flag == 1) {
            return ctx.createError({
              message: `**Email already exists..!`,
            });
          }

          return true;
        },
      }),
    password: yup
      .string()
      .trim()
      .required(`**Password can't be empty..!`)
      .min(8, `**Please enter password of at-least 8 characters..!`)
      .matches(passwordRegex, `**Please enter valid password..!`),
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
    dispatch(addUser(data));
    navigate(`/login`);
  };

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register form</h2>
          <br></br>
          <br></br>
          <label>Name :-</label>
          <input type="text" className="forminputs" {...register("name")} />
          {errors.name && (
            <p style={{ color: "red" }}>{errors.name?.message}</p>
          )}
          <br />
          <br />
          <label>Phone :-</label>
          <input type="number" className="forminputs" {...register("phone")} />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone?.message}</p>
          )}
          <br />
          <br />
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
          {errors.password && (
            <p style={{ color: "red" }}>
              **Please enter strong password..!
              <br />
              **First-letter should be capital character,
              <br />
              **After that 1 or more characters,
              <br />
              **And than should contain 1 character from [@,$,.] ,
              <br />
              **And than numbers or alphabetic characters..!
            </p>
          )}
          <br />
          <br />
          <div className="actions">
            <input type="submit" name="submit" value={"Submit"} />
          </div>
          <br />
          <br />
          Already have an Account..? <Link to={`/login`}>Sign in</Link>
        </form>
      </div>
    </div>
  );
};
