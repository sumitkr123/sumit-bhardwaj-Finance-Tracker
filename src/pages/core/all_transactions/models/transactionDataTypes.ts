import { Transaction } from "../../../../models/transactionModel";

export type Group1Type = {
  [key: string]: Transaction[];
};

export type GroupType = [Group1Type];
