import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cookieExpireTime } from "../../../utils/constants";
import { FormField } from "../../../components/FormFields/FormField";
import { RootState } from "../../../redux/store";

import { useAppSelector } from "../../../redux/hooks";
import { LoginValidationSchema } from "../../../validations/schema";
import { DynamicLoginForm, User } from "../../../models/exports";

export const Login = (): React.JSX.Element => {
  const users = useAppSelector<User[]>((state: RootState) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(LoginValidationSchema(users)),
    mode: "all",
  });

  const navigate = useNavigate();

  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["auth_token"]);

  const onSubmit = async (data: User): Promise<void> => {
    let randomstr = "";
    randomstr +=
      data.email + data.email.split("").reverse().join("") + data.pass;

    let auth_data = users.filter(
      (item: User) => item.email === data.email && item.pass === data.pass
    );

    const obj = { ...auth_data[0] };
    obj.token = randomstr;

    auth_data = [{ ...obj }];

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
          {Object.keys(DynamicLoginForm).map((input: string) => (
            <FormField
              key={input}
              error={errors[input]?.message as string}
              register={register}
              {...DynamicLoginForm[input]}
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
