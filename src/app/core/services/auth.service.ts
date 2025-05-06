import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  registerUser(user: any) {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));
  }

  authenticateUser(email: string, password: string) {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    return existingUsers.find(
      (user: any) => user.email === email && user.password === password
    );
  }

  checkUserExists(email: string) {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    return existingUsers.some((user: any) => user.email === email);
  }

  isAuthenticated(): boolean {
    return this.getLoggedInUser() !== null;
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }
}
