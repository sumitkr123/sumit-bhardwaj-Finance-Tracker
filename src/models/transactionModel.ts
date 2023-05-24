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
  receipt: string;
}
