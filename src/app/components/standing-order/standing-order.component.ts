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
        (sourceAccount &&
          destinationAccount &&
          !validAccountPrefixes.some((prefix) =>
            sourceAccount.accountNumber.startsWith(prefix)
          )) ||
        !validAccountPrefixes.some((prefix) =>
          destinationAccount.accountNumber.startsWith(prefix)
        )
      ) {
        alert(
          'Both source and destination accounts must start with SA, CA, or IA.'
        );
        return;
      }

      this.form.value.description =
        sourceAccount?.accountHolderName || 'Unknown Account Holder';

      this.standingOrderService.save(this.form.value);
      this.orders = this.standingOrderService.getAll();

      this.form.reset();
    }
  }
}
