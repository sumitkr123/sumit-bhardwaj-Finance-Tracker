import { PassRuleJSX } from "../../components/FormFields/PasswordRule";

export interface User {
  [key: string]: any;
  id: number;
  name: string;
  phone: string;
  email: string;
  pass: string;
}

export type TypeLoginValidationSchema = {
  email: string;
  pass: string;
};

type TypeLogin = {
  [key: string]: {
    name: string;
    label: string;
    type: string;
  };
};

export const DynamicLoginForm: TypeLogin = {
  email: {
    name: "email",
    label: "Email",
    type: "email",
  },
  pass: {
    name: "pass",
    label: "Password",
    type: "password",
  },
};

type TypeRegisterForm = {
  [key: string]: {
    name: string;
    label: string;
    type: string;
    passRules?: JSX.Element | string | JSX.Element[] | string[];
  };
};

export const DynamicRegisterForm: TypeRegisterForm = {
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
