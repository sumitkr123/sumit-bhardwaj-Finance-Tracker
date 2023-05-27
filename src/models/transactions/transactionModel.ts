import monthYears, {
  accountTypes,
  today,
  transactionTypes,
} from "../../utils/constants";

import * as yup from "yup";

export interface EditTransactionPayloadType {
  edit: Transaction;
  id: number;
}

export interface Transaction {
  [key: string]: any;
  id: number;
  tdate: string;
  notes: string;
  amount: number | string;
  FromAc: string;
  ToAc: string;
  ttype: string;
  monthyear: string;
  receipt: string | yup.AnyObject;
}

type TypeTransactionHeaders = {
  [key: string]: {
    name: string;
    isSortable: boolean;
    sortType?: string;
    type?: string;
  };
};

export const TransactionTabHeaders: TypeTransactionHeaders = {
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

type TypeTransactionForm = {
  [key: string]: {
    name: string;
    label: string;
    type: string;
    max?: string;
    otherType?: string;
    options?: string[];
  };
};

export const DynamicTransactionForm: TypeTransactionForm = {
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

export type Group1Type = {
  [key: string]: Transaction[];
};

export type GroupType = [Group1Type];

export type TypePagination = {
  showPage: number;
  totalpage: number;
  limit: number;
  pageno: number;
  pages: number[];
};

export type TypeTransaction = {
  transactions: Transaction[];
  groupVal?: string;
};

export type TableHeaderProps = {
  tabHeader: string;
  col: string;
  sorting: {
    [key: string]: string;
  };
  type?: string;
  newData: Transaction[];
  groupVal?: string;
  setSortingColumn: (column: string, type: string) => void;
};
