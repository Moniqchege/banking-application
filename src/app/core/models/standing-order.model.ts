export interface StandingOrder {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  frequency: string;
  nextExecutionDate: string;
  description: string;
  createdAt: Date;
}
