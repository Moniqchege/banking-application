import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly storageKey = 'customers';

  getCustomers(): Customer[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveCustomer(customer: Customer): void {
    const customers = this.getCustomers();
    customers.push(customer);
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
  }

  updateCustomer(updated: Customer): void {
    const customers = this.getCustomers().map((c) =>
      c.id === updated.id ? updated : c
    );
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
  }

  deleteCustomer(id: string): void {
    const customers = this.getCustomers().filter((c) => c.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
  }

  getCustomerById(id: string): Customer | undefined {
    return this.getCustomers().find((c) => c.id === id);
  }
}
