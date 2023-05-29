import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../../redux/ducks/users_slice";

import { FormField } from "../../../components/FormFields/FormField";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RegistrationValidationSchema } from "../../../validations/schema";
import { User } from "../../../models/exports";
import { DynamicRegisterForm } from "../../../utils/constants";

export const Register = (): React.JSX.Element => {
  const users = useAppSelector<User[]>((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(RegistrationValidationSchema(users)),
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
          {Object.keys(DynamicRegisterForm).map((input: string) => (
            <FormField
              key={input}
              error={errors[input]?.message as string}
              register={register}
              {...DynamicRegisterForm[input]}
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
