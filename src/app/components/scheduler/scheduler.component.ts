import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface StandingOrder {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  frequency: string;
  nextExecutionDate: string;
  description: string;
  createdAt: Date;
}

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent {
  message: string = '';

  runScheduler() {
    const standingOrders: StandingOrder[] = JSON.parse(
      localStorage.getItem('standingOrders') || '[]'
    );
    const accounts: any[] = JSON.parse(
      localStorage.getItem('accounts') || '[]'
    );

    standingOrders.forEach((order: StandingOrder) => {
      const fromAccount = accounts.find(
        (acc: any) => acc.accountNumber === order.fromAccount
      );
      const toAccount = accounts.find(
        (acc: any) => acc.accountNumber === order.toAccount
      );

      if (fromAccount && toAccount) {
        if (fromAccount.balance < order.amount) {
          console.warn(
            `Insufficient balance in account ${order.fromAccount} for order ${order.id}`
          );
          return;
        }

        fromAccount.balance -= order.amount;
        toAccount.balance += order.amount;

        console.log(
          `Transfer of ${order.amount} ${order.currency} from ${order.fromAccount} to ${order.toAccount}`
        );
      } else {
        console.error('Invalid account details for standing order', order);
      }
    });

    localStorage.setItem('accounts', JSON.stringify(accounts));
    this.message = 'Scheduler executed and balances updated.';
  }
}
