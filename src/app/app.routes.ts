import { Routes } from '@angular/router';
import { StandingOrderComponent } from './components/standing-order/standing-order.component';
import { AccountComponent } from './components/account/account.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'scheduler', component: SchedulerComponent },
  { path: 'standing-order', component: StandingOrderComponent },
];
