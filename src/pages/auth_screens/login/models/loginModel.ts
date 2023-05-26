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

export const dynamicLoginForm: TypeLogin = {
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
