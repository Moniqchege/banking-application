import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private storageKey = 'accounts';

  getAccounts(): Account[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addAccount(account: Account): void {
    const accounts = this.getAccounts();
    accounts.push(account);
    localStorage.setItem(this.storageKey, JSON.stringify(accounts));
  }

  updateAccount(updatedAccount: Account): void {
    const accounts = this.getAccounts();
    const index = accounts.findIndex((acc) => acc.id === updatedAccount.id);

    if (index !== -1) {
      accounts[index] = updatedAccount;
      localStorage.setItem(this.storageKey, JSON.stringify(accounts));
    }
  }

  deleteAccount(id: string): void {
    const accounts = this.getAccounts().filter((a) => a.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(accounts));
  }
}
