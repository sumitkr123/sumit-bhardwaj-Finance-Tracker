export const paginno = [1, 2, 3, 5, 10, 20, 30, 40];

export const fixedLengthValue = 250;

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

type typemonthYears = string;

const monthYears: typemonthYears[] = [];

export const supportedImg = ["png", "jpg", "jpeg"];

export const mb1 = 1024 * 1024;

export const fileReader = new FileReader();

month.map((month) => monthYears.push(`${month} ${currentyear}`));

export default monthYears;

export const fixedimit = 2;

export const fixedShowPageCount = 3;

export const groupby = [
  { tdate: "Transaction-date" },
  { monthyear: "Month-year" },
  { ttype: "Transaction-type" },
  { FromAc: "From-Ac" },
  { ToAc: "To-Ac" },
  { amount: "Amount" },
  { notes: "Notes" },
];

export const isValidFileType = (fileName: any) => {
  return fileName && supportedImg.includes(fileName.split(".").pop());
};

export async function getFile(file: Blob) {
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
