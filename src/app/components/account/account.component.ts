import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Account } from '../../core/models/account.model';
import { AccountService } from '../../core/services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  customers: any[] = [];
  accounts: Account[] = [];
  isEdit = false;
  currentAccountId: string | null = null;

  constructor(private fb: FormBuilder, private accountService: AccountService) {}

  ngOnInit(): void {
    this.customers = JSON.parse(localStorage.getItem('customers') || '[]');
    this.loadAccounts();
    this.accountForm = this.fb.group({
      customerId: ['', Validators.required],
      type: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      currency: ['KES', Validators.required],
    });
  }

  generateAccountNumber(type: string): string {
    const prefix = type === 'savings' ? 'SA' : type === 'checking' ? 'CA' : 'IA';
    const suffix = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${suffix}`;
  }

  createAccount(): void {
    if (this.accountForm.valid) {
      const formValue = this.accountForm.value;
      const newAccount: Account = {
        id: uuidv4(),
        customerId: formValue.customerId,
        accountNumber: this.generateAccountNumber(formValue.type),
        type: formValue.type,
        balance: formValue.balance,
        currency: formValue.currency,
        createdAt: new Date(),
      };

      if (this.isEdit) {
        const updatedAccount: Account = {
          ...newAccount,
          id: this.currentAccountId!,
        };
        this.accountService.updateAccount(updatedAccount);
        alert('Account updated successfully!');
      } else {
        this.accountService.addAccount(newAccount);
        alert('Account created successfully!');
      }

      this.accountForm.reset({ balance: 0, currency: 'KES' });
      this.loadAccounts();
      this.isEdit = false;
      this.currentAccountId = null;
    }
  }

  loadAccounts(): void {
    this.accounts = this.accountService.getAccounts();
  }

  deleteAccount(id: string): void {
    this.accountService.deleteAccount(id);
    this.loadAccounts();
  }

  editAccount(account: Account): void {
    this.isEdit = true;
    this.currentAccountId = account.id;
    this.accountForm.setValue({
      customerId: account.customerId,
      type: account.type,
      balance: account.balance,
      currency: account.currency,
    });
  }

  getCustomerName(customerId: string): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
  }
}
