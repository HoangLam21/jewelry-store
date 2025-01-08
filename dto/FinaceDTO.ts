export interface CretaeFinance {
  date: string; // Date as a string (ISO format or another format)
  type: "income" | "outcome"; // Type can be either 'income' or 'outcome'
  value: number; // Value of the transaction
}
