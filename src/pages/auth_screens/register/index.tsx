import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../../redux/ducks/users_slice";

import {
  mailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
} from "../../../utils/constants";
import { FormField } from "../../../components/FormFields/FormField";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { User } from "../../../models/userModel";
import { dynamicRegisterForm } from "./models/registerModel";

export const Register = (): React.JSX.Element => {
  const users = useAppSelector<User[]>((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  const registrationValidationSchema: yup.ObjectSchema<User> = yup
    .object()
    .shape({
      id: yup.mixed(),
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
          test(value: string, ctx: yup.TestContext<yup.AnyObject>) {
            let flag = 0;

            for (let i in users) {
              if (users[i].email === value) {
                flag = 1;
                break;
              }
            }

            if (flag === 1) {
              return ctx.createError({
                message: `**Email already exists..!`,
              });
            }

            return true;
          },
        }),
      pass: yup
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
  } = useForm<User>({
    resolver: yupResolver(registrationValidationSchema),
    mode: "all",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: User): Promise<void> => {
    dispatch(addUser(data));

    navigate(`/login`);
  };

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register form</h2>
          {Object.keys(dynamicRegisterForm).map((input: string) => (
            <FormField
              key={input}
              error={errors[input]?.message as string}
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
