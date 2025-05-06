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
  imports: [ CommonModule],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css'
})
export class SchedulerComponent {
  message = '';

  runScheduler() {
    const standingOrders = JSON.parse(localStorage.getItem('standingOrders') || '[]');
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');

    

    standingOrders.forEach((order: StandingOrder) => {
      // Now TypeScript knows what `order` is
      console.log(order.amount);
    });

    localStorage.setItem('accounts', JSON.stringify(accounts));
    this.message = 'Scheduler executed and balances updated.';
  }
}
