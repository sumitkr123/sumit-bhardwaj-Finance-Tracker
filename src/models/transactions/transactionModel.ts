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

export type TypeTransactionHeaders = {
  [key: string]: {
    name: string;
    isSortable: boolean;
    sortType?: string;
    type?: string;
  };
};

export type TypeTransactionForm = {
  [key: string]: {
    name: string;
    label: string;
    type: string;
    max?: string;
    otherType?: string;
    options?: string[];
  };
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
