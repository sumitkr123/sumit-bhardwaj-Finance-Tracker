import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/ducks/users_slice";

import {
  mailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
} from "../../../utils/constants";
import { FormField } from "../../../components/FormFields/FormField";

type typeRegister = {
  [key: string]: any;
};

export const dynamicRegisterForm: typeRegister = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
  },
  phone: {
    name: "phone",
    label: "Phone",
    type: "number",
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    rules: (
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
    ),
  },
};

export const Register = () => {
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const registrationValidationSchema = yup.object().shape({
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
    resolver: yupResolver(registrationValidationSchema),
    mode: "all",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    dispatch(addUser(data));
    navigate(`/login`);
  };

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register form</h2>
          {Object.keys(dynamicRegisterForm).map((input) => (
            <FormField
              key={input}
              errors={errors}
              register={register}
              {...dynamicRegisterForm[input]}
            />
          ))}
          <div className="actions">
            <input type="submit" name="submit" value={"Submit"} />
          </div>

          <p>
            Already have an Account..? <Link to={`/login`}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
