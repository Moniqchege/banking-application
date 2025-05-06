import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  getAll(): Transaction[] {
    const transactions = localStorage.getItem('transactions');
    return transactions ? JSON.parse(transactions) : [];
  }

  save(transaction: Transaction): void {
    const transactions = this.getAll();
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  clear(): void {
    localStorage.removeItem('transactions');
  }
}
