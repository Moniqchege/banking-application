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
  
  export function createEmptyStandingOrder(): StandingOrder {
    return {
      id: '',
      sourceAccountId: '',
      destinationAccountId: '',
      amount: 0,
      currency: 'USD',
      frequency: 'monthly',
      nextExecutionDate: new Date(),
      createdAt: new Date(),
      description: ''
    };

    
  }