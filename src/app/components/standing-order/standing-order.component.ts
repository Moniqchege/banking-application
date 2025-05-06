import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-standing-order',
  imports: [FormsModule, CommonModule],
  templateUrl: './standing-order.component.html',
  styleUrl: './standing-order.component.css'
})
export class StandingOrderComponent {
  order = { source: '', destination: '', amount: 0, schedule: '' };
  success = false;

  createStandingOrder() {
    const standingOrders = JSON.parse(localStorage.getItem('standingOrders') || '[]');
    standingOrders.push(this.order);
    localStorage.setItem('standingOrders', JSON.stringify(standingOrders));
    this.success = true;
    this.order = { source: '', destination: '', amount: 0, schedule: '' };
  }
}
