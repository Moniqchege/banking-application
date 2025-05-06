import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Account } from '../models/account.model';
import { StandingOrder } from '../models/standing-order.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly CUSTOMERS_KEY = 'banking-app-customers';
  private readonly ACCOUNTS_KEY = 'banking-app-accounts';
  private readonly STANDING_ORDERS_KEY = 'banking-app-standing-orders';

  // Customer methods
  saveCustomer(customer: Customer): void {
    const customers = this.getAllCustomers();
    customers.push(customer);
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers));
  }

  getAllCustomers(): Customer[] {
    const data = localStorage.getItem(this.CUSTOMERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getCustomerById(id: string): Customer | undefined {
    const customers = this.getAllCustomers();
    return customers.find(c => c.id === id);
  }

  // Account methods
  saveAccount(account: Account): void {
    const accounts = this.getAllAccounts();
    accounts.push(account);
    localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  getAllAccounts(): Account[] {
    const data = localStorage.getItem(this.ACCOUNTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getAccountsByCustomerId(customerId: string): Account[] {
    const accounts = this.getAllAccounts();
    return accounts.filter(a => a.customerId === customerId);
  }

  updateAccountBalance(accountId: string, newBalance: number): void {
    const accounts = this.getAllAccounts();
    const account = accounts.find(a => a.id === accountId);
    if (account) {
      account.balance = newBalance;
      localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
    }
  }

  // Standing Order methods
  saveStandingOrder(order: StandingOrder): void {
    const orders = this.getAllStandingOrders();
    orders.push(order);
    localStorage.setItem(this.STANDING_ORDERS_KEY, JSON.stringify(orders));
  }

  getAllStandingOrders(): StandingOrder[] {
    const data = localStorage.getItem(this.STANDING_ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getStandingOrdersByAccount(accountId: string): StandingOrder[] {
    const orders = this.getAllStandingOrders();
    return orders.filter(o => o.sourceAccountId === accountId);
  }

  deleteStandingOrder(orderId: string): void {
    const orders = this.getAllStandingOrders().filter(o => o.id !== orderId);
    localStorage.setItem(this.STANDING_ORDERS_KEY, JSON.stringify(orders));
  }
}