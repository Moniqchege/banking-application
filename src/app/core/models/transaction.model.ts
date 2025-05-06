export interface Transaction {
  id: string;
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}
