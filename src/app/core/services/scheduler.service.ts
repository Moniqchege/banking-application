import { Injectable } from '@angular/core';
import { StandingOrder } from '../models/standing-order.model';
import { TransactionService } from './transaction.service';
import { AccountService } from './account.service';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  runScheduler(): void {
    const standingOrders: StandingOrder[] = JSON.parse(
      localStorage.getItem('standingOrders') || '[]'
    );

    standingOrders.forEach((order) => {
      this.processStandingOrder(order);
    });
  }

  private processStandingOrder(order: StandingOrder): void {
    const accounts = this.accountService.getAccounts();
    const sourceAccount = accounts.find(
      (acc) => acc.id === order.fromAccount
    );
    const destinationAccount = accounts.find(
      (acc) => acc.id === order.toAccount
    );

    if (
      sourceAccount &&
      destinationAccount &&
      sourceAccount.balance >= order.amount
    ) {
      sourceAccount.balance -= order.amount;
      destinationAccount.balance += order.amount;

      this.accountService.updateAccount(sourceAccount);
      this.accountService.updateAccount(destinationAccount);

      const transaction: Transaction = {
        id: `${new Date().getTime()}`,
        sourceAccountId: order.fromAccount,
        destinationAccountId: order.toAccount,
        amount: order.amount,
        currency: order.currency,
        status: 'completed',
        createdAt: new Date(),
      };

      this.transactionService.save(transaction);

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
    const standingOrders: StandingOrder[] = JSON.parse(
      localStorage.getItem('standingOrders') || '[]'
    );
    const updatedOrders = standingOrders.map((existingOrder) =>
      existingOrder.id === order.id ? order : existingOrder
    );
    localStorage.setItem('standingOrders', JSON.stringify(updatedOrders));
  }
}
