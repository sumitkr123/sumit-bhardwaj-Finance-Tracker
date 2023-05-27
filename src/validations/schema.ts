import * as yup from "yup";
import {
  fixedLengthValue,
  isValidFileType,
  mailRegex,
  mb1,
  nameRegex,
  passwordRegex,
  phoneRegex,
} from "../utils/constants";
import {
  Transaction,
  TypeLoginValidationSchema,
  User,
} from "../models/exports";

export const TransactionValidationSchema: yup.ObjectSchema<Transaction> = yup
  .object()
  .shape({
    id: yup.mixed(),
    notes: yup
      .string()
      .trim()
      .required(`**Notes can't be empty..!`)
      .max(fixedLengthValue),
    tdate: yup.string().required(`**Date can't be empty..!`),
    receipt: yup
      .mixed()
      .required("**Receipt can't be empty..!")
      .test({
        name: "isValidReceipt",
        skipAbsent: true,
        test(value: yup.AnyObject, cto: yup.TestContext<yup.AnyObject>) {
          if (value === null || value === undefined) {
            return cto.createError({
              message: "**Receipt can't be empty..!",
            });
          } else {
            if (value[0] === undefined) {
              return cto.createError({
                message: "**Receipt can't be empty..!",
              });
            }
            if (value[0].name !== undefined) {
              if (!isValidFileType(value[0].name)) {
                return cto.createError({
                  message: "**Receipt format is not valid..!",
                });
              }
              if (!(value[0].size <= mb1)) {
                return cto.createError({
                  message: "**Receipt size exceeds..!",
                });
              }
            }
          }
          return true;
        },
      }),
    amount: yup
      .number()
      .required("**Amount can't be empty..!")
      .typeError("**Amount can't be empty..!")
      .min(1, "**Amount should be greater than 0"),
    FromAc: yup
      .string()
      .required(`**From A/c can't be empty..!`)
      .test({
        name: "FromAc",
        skipAbsent: true,
        test(value: string, ctx: yup.TestContext<yup.AnyObject>) {
          if (value === "") {
            return ctx.createError({
              message: `**From A/c can't be empty..!`,
            });
          }
          if (value === this.parent.ToAc) {
            return ctx.createError({
              message: `**From A/c and To A/c are same..!`,
            });
          }
          return true;
        },
      }),
    ToAc: yup
      .string()
      .required(`**To A/c can't be empty..!`)
      .test({
        name: "ToAc",
        skipAbsent: true,
        test(value: string, ctx: yup.TestContext<yup.AnyObject>) {
          if (value === "") {
            return ctx.createError({
              message: `**To A/c can't be empty..!`,
            });
          }
          if (value === this.parent.FromAc) {
            return ctx.createError({
              message: `**To A/c and From A/c are same..!`,
            });
          }
          return true;
        },
      }),
    ttype: yup.string().required(`**Transaction type can't be empty..!`),
    monthyear: yup.string().required(`**Month year can't be empty..!`),
  });

export const RegistrationValidationSchema = (
  users: User[]
): yup.ObjectSchema<User> => {
  return yup.object().shape({
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
};

export const LoginValidationSchema = (
  users: User[]
): yup.ObjectSchema<TypeLoginValidationSchema> => {
  return yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(`**Email can't be empty..!`)
      .test({
        name: "email",
        skipAbsent: true,
        test(value: string, ctx) {
          if (value.trim() === "") {
            return ctx.createError({
              message: `**Email can't be empty..!`,
            });
          } else {
            let flag = 0;

            for (let i in users) {
              if (users[i].email === value) {
                flag = 1;
                break;
              }
            }

            if (flag === 0) {
              return ctx.createError({
                message: `**Email doesn't exist..!`,
              });
            }
          }
          return true;
        },
      }),
    pass: yup
      .string()
      .trim()
      .required(`**Password can't be empty..!`)
      .test({
        name: "password",
        skipAbsent: true,
        test(value: string, ctx) {
          if (value.trim() === "") {
            return ctx.createError({
              message: `**Password can't be empty..!`,
            });
          } else {
            let flag = 0;

            for (let i in users) {
              if (
                users[i].email === this.parent.email &&
                users[i].pass === value
              ) {
                flag = 1;
                break;
              }
            }

            if (flag === 0) {
              return ctx.createError({
                message: `**Password doesn't match..!`,
              });
            }
          }
          return true;
        },
      }),
  });
};
