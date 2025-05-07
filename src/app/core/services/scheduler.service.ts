import { Injectable } from '@angular/core';
import { StandingOrder } from '../models/standing-order.model';
import { TransactionService } from './transaction.service';
import { AccountService } from './account.service';
import { Transaction } from '../models/transaction.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  runScheduler(): void {
    const standingOrders: StandingOrder[] = JSON.parse(localStorage.getItem('standingOrders') || '[]');
    const today = new Date();
    let hasErrors = false;

    standingOrders.forEach((order) => {
      const nextExecution = new Date(order.nextExecutionDate);
      if (nextExecution <= today) {
        const success = this.processStandingOrder(order);
        if (success) {
          order.nextExecutionDate = this.calculateNextExecutionDate(order.frequency).toISOString();
          this.updateStandingOrder(order);
        } else {
          hasErrors = true;
        }
      }
    });

    if (!hasErrors) {
      alert('Scheduler has run successfully!');
    }
  }

  private processStandingOrder(order: StandingOrder): boolean {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const fromAccount = accounts.find((acc: Account) => acc.id === order.fromAccount);
    const toAccount = accounts.find((acc: Account) => acc.id === order.toAccount);

    if (!fromAccount || !toAccount) return false;

    if (fromAccount.balance < order.amount) {
      alert(`Insufficient funds in ${fromAccount.accountNumber}`);
      return false;
    }

    fromAccount.balance -= order.amount;
    toAccount.balance += order.amount;

    const transaction: Transaction = {
      id: `${new Date().getTime()}`,
      sourceAccountId: order.fromAccount,
      destinationAccountId: order.toAccount,
      amount: order.amount,
      currency: order.currency,
      status: 'completed',
      createdAt: new Date()
    };

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('accounts', JSON.stringify(accounts));

    return true;
  }

  runSingleOrder(order: StandingOrder): void {
    const success = this.processStandingOrder(order);
    if (success) {
      order.nextExecutionDate = this.calculateNextExecutionDate(order.frequency).toISOString();
      this.updateStandingOrder(order);
    }
  }

  private calculateNextExecutionDate(frequency: string): Date {
    const currentDate = new Date();
    switch (frequency) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'quarterly':
        currentDate.setMonth(currentDate.getMonth() + 3);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
    }
    return currentDate;
  }

  private updateStandingOrder(order: StandingOrder): void {
    const standingOrders: StandingOrder[] = JSON.parse(localStorage.getItem('standingOrders') || '[]');
    const updatedOrders = standingOrders.map((existingOrder) =>
      existingOrder.id === order.id ? order : existingOrder
    );
    localStorage.setItem('standingOrders', JSON.stringify(updatedOrders));
  }
}
