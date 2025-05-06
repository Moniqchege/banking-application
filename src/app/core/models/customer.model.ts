export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: Date;
    createdAt: Date;
  }
  
  export function createEmptyCustomer(): Customer {
    return {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: new Date(),
      createdAt: new Date()
    };
  }