import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  imports: [FormsModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  account = { customer: '', type: '', balance: 0 };
  customers: any[] = [];
  success = false;

  ngOnInit() {
    this.customers = JSON.parse(localStorage.getItem('customers') || '[]');
  }

  createAccount() {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    accounts.push(this.account);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    this.success = true;
    this.account = { customer: '', type: '', balance: 0 };
  }
}
