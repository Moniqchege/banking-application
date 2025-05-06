export interface Account {
  id: string;
  customerId: string;
  accountNumber: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  createdAt: Date;
  currency: string;
}
