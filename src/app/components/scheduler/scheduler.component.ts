import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface StandingOrder {
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  schedule: string;
}

@Component({
  selector: 'app-scheduler',
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
      const sourceAccount = accounts.find(
        (acc: any) => acc.accountNumber === order.sourceAccount
      );
      const destinationAccount = accounts.find(
        (acc: any) => acc.accountNumber === order.destinationAccount
      );

      if (sourceAccount && destinationAccount) {
        sourceAccount.balance -= order.amount;

        destinationAccount.balance += order.amount;

        console.log(
          `Transfer of ${order.amount} from ${order.sourceAccount} to ${order.destinationAccount}`
        );
      } else {
        console.error('Invalid account details for standing order', order);
      }
    });

    localStorage.setItem('accounts', JSON.stringify(accounts));

    this.message = 'Scheduler executed and balances updated.';
  }
}
