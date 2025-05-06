export interface Account {
    id: string;
    customerId: string;
    accountNumber: string;
    type: 'checking' | 'savings' | 'investment';
    balance: number;
    createdAt: Date;
    currency: string;
  }
  
  export function createEmptyAccount(): Account {
    return {
      id: '',
      customerId: '',
      accountNumber: this.generateAccountNumber(),
      type: 'checking',
      balance: 0,
      createdAt: new Date(),
      currency: 'USD'
    };
  }
  
  export function generateAccountNumber(): string {
    return 'AC' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }