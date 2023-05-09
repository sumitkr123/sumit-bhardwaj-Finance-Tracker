import * as yup from "yup";

export const paginno = [1, 2, 3, 5, 10, 20, 30, 40];

export const fixedLengthValue = 250;
export const numRegex = /^[1-9]{1}[0-9]*$/;

export const phoneRegex = /^[0-9]{10}$/;
export const mailRegex = /^\w+[@]{1}\w+(\.[a-zA-Z]{2,3})+$/;

export const accountTypes = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];

export const transactionTypes = ["Home Expense", "Personal Expense", "Income"];

export const today = new Date();
export const currentyear = today.getFullYear();
export const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthYears = [];

export const supportedImg = ["png", "jpg", "jpeg"];

export const mb1 = 1024 * 1024;

export const fileReader = new FileReader();

month.map((month) => monthYears.push(`${month} ${currentyear}`));

export default monthYears;

export const fixedimit = 2;

export const currency = {
  rupee: <span>&#8377;</span>,
  dollar: <span>&#36;</span>,
  pound: <span>&#163;</span>,
  yen: <span>&#165;</span>,
  euro: <span>&#8364;</span>,
};

export const groupby = [
  { tdate: "Transaction-date" },
  { monthyear: "Month-year" },
  { ttype: "Transaction-type" },
  { FromAc: "From-Ac" },
  { ToAc: "To-Ac" },
  { amount: "Amount" },
  { notes: "Notes" },
];

export const amountFormatter = (amount, type) => {
  let newamount = amount.toString();
  let length = newamount.length;
  let newstr = "";

  if (length <= 3) {
    newstr += newamount;
  } else {
    let j = 0;
    newamount
      .split("")
      .reverse()
      .forEach((item) => {
        if (j === 3) {
          newstr = newstr + "," + item;
        } else if (j % 2 !== 0 && j > 3) {
          newstr = newstr + "," + item;
        } else {
          newstr += item;
        }

        j++;
      });
    newstr = newstr.split("").reverse().join("");
  }

  newstr = (
    <p>
      {type !== null && type !== undefined && type !== ""
        ? currency[type.trim().toLowerCase()]
        : currency.rupee}
      {newstr}
    </p>
  );

  return newstr;
};

function isValidFileType(fileName) {
  return fileName && supportedImg.includes(fileName.split(".").pop());
}

export const validationSchema = yup.object().shape({
  notes: yup
    .string()
    .required(`**Notes can't be empty..!`)
    .max(fixedLengthValue),
  tdate: yup.string().required(`**Date can't be empty..!`).max(today),
  receipt: yup.mixed().test({
    name: "isValidReceipt",
    skipAbsent: true,
    test(value, ctx) {
      if (value === null || value === undefined || value === "") {
        return ctx.createError({
          message: "**Receipt can't be empty..!",
        });
      } else {
        if (value[0] === undefined) {
          return ctx.createError({
            message: "**Receipt can't be empty..!",
          });
        }
        if (value[0].name !== undefined) {
          if (!isValidFileType(value[0].name)) {
            return ctx.createError({
              message: "**Receipt format is not valid..!",
            });
          }
          if (!(value[0].size <= mb1)) {
            return ctx.createError({ message: "**Receipt size exceeds..!" });
          }
        }
      }
      return true;
    },
  }),
  amount: yup
    .number()
    .required()
    .typeError("**Amount can't be empty..!")
    .min(1, "**Amount should be greater than 0"),
  FromAc: yup.string().test({
    name: "FromAc",
    skipAbsent: true,
    test(value, ctx) {
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
  ToAc: yup.string().test({
    name: "ToAc",
    skipAbsent: true,
    test(value, ctx) {
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

export async function getFile(file) {
  fileReader.readAsDataURL(file);

  await new Promise((resolve) => (fileReader.onload = () => resolve()));

  return fileReader.result;
}
