import { Routes } from '@angular/router';
import { StandingOrderComponent } from './components/standing-order/standing-order.component';
import { AccountComponent } from './components/account/account.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';

export const routes: Routes = [
    { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'accounts', component: AccountComponent },
  { path: 'scheduler', component: SchedulerComponent },
  { path: 'standing-orders', component: StandingOrderComponent },
];
