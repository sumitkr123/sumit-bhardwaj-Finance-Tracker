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

export type TypeLogin = {
  [key: string]: {
    name: string;
    label: string;
    type: string;
  };
};

export type TypeRegisterForm = {
  [key: string]: {
    name: string;
    label: string;
    type: string;
    passRules?: JSX.Element | string | JSX.Element[] | string[];
  };
};
