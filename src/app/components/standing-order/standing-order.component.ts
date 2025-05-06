import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StandingOrderService } from '../../core/services/standing-order.service';
import { AccountService } from '../../core/services/account.service';
import { SchedulerService } from '../../core/services/scheduler.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standing-order',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './standing-order.component.html',
  styleUrls: ['./standing-order.component.css'],
})
export class StandingOrderComponent implements OnInit {
  form!: FormGroup;
  accounts: any[] = [];
  orders: any[] = [];

  constructor(
    private fb: FormBuilder,
    private standingOrderService: StandingOrderService,
    private accountService: AccountService,
    private schedulerService: SchedulerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sourceAccountId: ['', Validators.required],
      destinationAccountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      currency: ['KES', Validators.required],
      frequency: ['monthly', Validators.required],
      nextExecutionDate: ['', Validators.required],
      description: [''],
    });

    this.accounts = this.accountService.getAccounts();
    this.orders = this.standingOrderService.getAll();
  }

  runScheduler(): void {
    this.schedulerService.runScheduler();
    this.orders = this.standingOrderService.getAll();
    alert('Scheduler has run successfully!');
  }

  submit(): void {
    if (this.form.valid) {
      const sourceAccount = this.accounts.find(
        (acc) => acc.id === this.form.value.sourceAccountId
      );
      const destinationAccount = this.accounts.find(
        (acc) => acc.id === this.form.value.destinationAccountId
      );
  
      const validAccountPrefixes = ['SA', 'CA', 'IA'];
  
      if (
        !sourceAccount ||
        !destinationAccount ||
        !validAccountPrefixes.some((prefix) =>
          sourceAccount.accountNumber.startsWith(prefix)
        ) ||
        !validAccountPrefixes.some((prefix) =>
          destinationAccount.accountNumber.startsWith(prefix)
        )
      ) {
        alert(
          'Both source and destination accounts must start with SA, CA, or IA.'
        );
        return;
      }
  
      // Get customer name from source account’s customerId
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const sourceCustomer = customers.find(
        (c: any) => c.id === sourceAccount.customerId
      );
      const customerName = sourceCustomer
        ? `${sourceCustomer.firstName} ${sourceCustomer.lastName}`
        : 'Unknown';
  
      const newOrder = {
        amount: this.form.value.amount,
        currency: this.form.value.currency,
        frequency: this.form.value.frequency,
        nextExecutionDate: this.form.value.nextExecutionDate,
        fromAccount: sourceAccount.accountNumber,
        toAccount: destinationAccount.accountNumber,
        description: customerName,
      };
  
      this.standingOrderService.save(newOrder);
      this.orders = this.standingOrderService.getAll().reverse(); // newest first
      this.form.reset();
    }
  }
  
  
}
