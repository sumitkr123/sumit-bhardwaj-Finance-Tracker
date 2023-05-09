import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/register.css";
import { useEffect, useState } from "react";
import { FormField } from "../../../components/FormFields/FormField";
import { mailRegex, numRegex, phoneRegex } from "../../../utils/constants";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
};

const validationSchema = {
  name: {
    label: "Name",
    type: "name",
    rules: {
      required: true,
    },
  },
  phone: {
    label: "Phone no.",
    type: "phone",
    rules: {
      required: true,
      matchWithRegex: phoneRegex,
    },
  },
  email: {
    label: "Email",
    type: "email",
    rules: {
      required: true,
      matchWithRegex: mailRegex,
    },
  },
  password: {
    label: "Password",
    type: "password",
    rules: {
      required: true,
    },
  },
};

const FieldWrapper = ({ registerForm, setRegisterForm, ...rest }) => (
  <FormField
    {...rest}
    {...registerForm}
    onChange={(value) => {
      let a = { ...registerForm.values };
      a[rest.name] = value;
      setRegisterForm((old) => ({ ...old, values: a }));
    }}
  />
);

export const Register = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    values: initialValues,
    errors: {},
    submit: false,
  });

  useEffect(() => {
    if (registerForm.submit === true) {
      validateFormValues();
    }
  }, [registerForm.values]);

  const validateFormValues = () => {
    const tempErrors = { ...registerForm.errors };
    Object.keys(validationSchema).forEach((field) => {
      const errors = getFieldErrors(validationSchema[field], field);
      if (errors.length) {
        tempErrors[field] = errors;
      } else {
        // delete field errors if exists
        if (tempErrors[field]) {
          delete tempErrors[field];
        }
      }
    });
    setRegisterForm((old) => ({ ...old, errors: tempErrors }));
    return tempErrors;
  };

  const fieldPropsCommon = {
    registerForm,
    setRegisterForm,
  };

  const getFieldErrors = (fieldInfo, fieldName) => {
    return (
      Object.keys(fieldInfo["rules"])
        .map((ruleType) => {
          switch (ruleType) {
            case "matchWithRegex":
              return validateWithRegex(
                fieldInfo["rules"][ruleType],
                fieldInfo["label"],
                registerForm.values[fieldName],
                fieldInfo["type"]
              );
            default:
              // required
              return (
                !registerForm.values[fieldName].trim() &&
                `${fieldInfo["label"]} is required`
              );
          }
        })
        // remove false items from the validation messages
        .filter((item) => item)
    );
  };

  const validateWithRegex = (ruleValue, fieldName, fieldValue, fieldType) => {
    switch (fieldType) {
      case "email":
        return (
          !fieldValue.match(ruleValue) && `${fieldName} is badly formatted..!`
        );
      case "phone":
        return (
          !fieldValue.match(ruleValue) && `Please enter valid ${fieldName}..!`
        );
      default:
        // for rest of the fields
        return (
          fieldValue.length > ruleValue &&
          `${fieldName} cannot exceed ${ruleValue} in length`
        );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setRegisterForm((old) => ({ ...old, submit: true }));

    const newErrors = validateFormValues();
    if (Object.keys(newErrors).length === 0) {
      let existingData = JSON.parse(localStorage.getItem("all_users_data"));

      let user_data = {};
      if (existingData) {
        let flag = 0;
        for (let i in existingData) {
          if (existingData[i].email === registerForm.values.email) {
            flag = 1;
            break;
          }
        }

        if (flag === 1) {
          alert("Email already exists..!");
        } else {
          user_data["id"] = existingData[existingData.length - 1].id + 1;
          user_data["name"] = registerForm.values.name;
          user_data["phone"] = registerForm.values.phone;
          user_data["email"] = registerForm.values.email;
          user_data["pass"] = registerForm.values.password;

          existingData.push(user_data);

          localStorage.setItem("all_users_data", JSON.stringify(existingData));

          navigate("/login");
        }
      } else {
        user_data["id"] = 1;
        user_data["name"] = registerForm.values.name;
        user_data["phone"] = registerForm.values.phone;
        user_data["email"] = registerForm.values.email;
        user_data["pass"] = registerForm.values.password;

        localStorage.setItem("all_users_data", JSON.stringify([user_data]));

        navigate("/login");
      }
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
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="inputs">
                <FieldWrapper
                  type="text"
                  label="Name"
                  name="name"
                  {...fieldPropsCommon}
                />
                <FieldWrapper
                  type="text"
                  label="Phone"
                  name="phone"
                  {...fieldPropsCommon}
                />
                <FieldWrapper
                  type="text"
                  label="Email"
                  name="email"
                  {...fieldPropsCommon}
                />
                <FieldWrapper
                  type="text"
                  label="Password"
                  name="password"
                  {...fieldPropsCommon}
                />
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
