import { type } from "@testing-library/user-event/dist/type";

export const paginno = [1, 2, 3, 5, 10, 20, 30, 40];

export const fixedLengthValue = 250;
// export const numRegex = /^[1-9]{1}[0-9]*$/;

export const nameRegex = /^[a-zA-Z]{2,3}[a-zA-Z\s]*$/;
export const phoneRegex = /^[6-9]\d{9}$/;
export const mailRegex = /^\w+[@]{1}\w+(\.[a-zA-Z]{2,3})+$/;
export const passwordRegex = /^[A-Z]{1}[a-zA-Z]+[@$.]{1}[a-zA-Z\d]+$/;

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

type typemonthYears = any;

const monthYears: typemonthYears = [];

export const supportedImg = ["png", "jpg", "jpeg"];

export const mb1 = 1024 * 1024;

export const fileReader = new FileReader();

month.map((month) => monthYears.push(`${month} ${currentyear}`));

export default monthYears;

export const fixedimit = 2;

export const fixedShowPageCount = 3;

type typeCurrency = {
  [key: string]: JSX.Element;
};

export const currency: typeCurrency = {
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

export const amountFormatter = (amount: any, valueType: any) => {
  let newamount = amount.toString();
  let length = newamount.length;
  type typenewstr = any;

  let newstr: typenewstr = "";

  if (length <= 3) {
    newstr += newamount;
  } else {
    let j = 0;
    newamount
      .split("")
      .reverse()
      .forEach((item: any) => {
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
      {valueType !== null && valueType !== undefined && valueType !== ""
        ? currency[valueType.trim().toLowerCase()]
        : currency.rupee}
      {newstr}
    </p>
  );

  return newstr;
};

export const isValidFileType = (fileName: any) => {
  return fileName && supportedImg.includes(fileName.split(".").pop());
};

export async function getFile(file: any) {
  fileReader.readAsDataURL(file);

  await new Promise<void>((resolve) => (fileReader.onload = () => resolve()));

  return fileReader.result;
}

let date = new Date();
const minutes = 60;
const seconds = 60;
const milliseconds = 1000;

date.setTime(date.getTime() + minutes * seconds * milliseconds);

export const cookieExpireTime = date;

type typeTransactionHeaders = {
  [key: string]: any;
};

export const TransactionTabHeaders: typeTransactionHeaders = {
  tdate: { name: "Transaction-Date", isSortable: true, sortType: "date" },
  monthyear: { name: "Month-year", isSortable: true, sortType: "monthyear" },
  ttype: { name: "Transaction-Type", isSortable: true },
  FromAc: { name: "From-A/c", isSortable: true },
  ToAc: { name: "To-A/c", isSortable: true },
  amount: {
    name: "Amount",
    isSortable: true,
    sortType: "number",
    type: "amount",
  },
  receipt: { name: "Receipt", isSortable: false, type: "image" },
  notes: { name: "Notes", isSortable: true },
};

type typeTransactionForm = {
  [key: string]: any;
};

export const dynamicTransactionForm: typeTransactionForm = {
  tdate: {
    name: "tdate",
    label: "Transaction date",
    type: "date",
    max: today.toISOString().split("T")[0],
  },
  notes: {
    name: "notes",
    label: "Notes",
    type: "textarea",
  },
  amount: {
    name: "amount",
    label: "Amount",
    type: "number",
  },
  FromAc: {
    name: "FromAc",
    label: "From A/c",
    type: "select",
    options: accountTypes,
  },
  ToAc: {
    name: "ToAc",
    label: "To A/c",
    type: "select",
    options: accountTypes,
  },
  ttype: {
    name: "ttype",
    label: "Transaction type",
    type: "select",
    options: transactionTypes,
  },
  monthyear: {
    name: "monthyear",
    label: "Month year",
    type: "select",
    options: monthYears,
  },
  receipt: {
    name: "receipt",
    label: "Receipt",
    type: "file",
    otherType: "image",
  },
};

export const TransactionFormInitialValues = {
  notes: "",
  amount: "",
  FromAc: "",
  ToAc: "",
  ttype: "",
  monthyear: "",
  tdate: "",
  receipt: "",
  id: 0,
};
