import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/ducks/users_slice";

import {
  dynamicRegisterForm,
  mailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
} from "../../../utils/constants";
import { FormField } from "../../../components/FormFields/FormField";

export const Register = () => {
  const users = useSelector((state) => state.users);
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

  const onSubmit = async (data) => {
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
