import { Injectable } from '@angular/core';
import { StandingOrder } from '../models/standing-order.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class StandingOrderService {
  private storageKey = 'standingOrders';

  getAll(): StandingOrder[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  save(order: Omit<StandingOrder, 'id' | 'createdAt'>): void {
    const orders = this.getAll();
    const newOrder: StandingOrder = {
      ...order,
      id: uuidv4(),
      createdAt: new Date(),
    };
    orders.push(newOrder);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }
  

  delete(id: string): void {
    const orders = this.getAll().filter((o) => o.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }
}
