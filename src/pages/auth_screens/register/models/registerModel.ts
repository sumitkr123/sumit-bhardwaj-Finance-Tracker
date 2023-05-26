import { PassRuleJSX } from "../../../../components/FormFields/PasswordRule";

type TypeRegisterForm = {
  [key: string]: {
    name: string;
    label: string;
    type: string;
    passRules?: JSX.Element | string | JSX.Element[] | string[];
  };
};

export const dynamicRegisterForm: TypeRegisterForm = {
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
  pass: {
    name: "pass",
    label: "Password",
    type: "password",
    passRules: PassRuleJSX,
  },
};
