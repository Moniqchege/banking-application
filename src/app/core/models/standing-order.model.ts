export interface StandingOrder {
  id: string;
  fromAccount: string; // e.g. "SA879847"
  toAccount: string;   // e.g. "CA123456"
  amount: number;
  currency: string;
  frequency: string;
  nextExecutionDate: string;
  description: string; // Account holder's name
  createdAt: Date;
}

