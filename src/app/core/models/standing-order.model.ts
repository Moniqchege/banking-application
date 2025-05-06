export interface StandingOrder {
  id: string;
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  currency: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextExecutionDate: Date;
  createdAt: Date;
  description: string;
}
