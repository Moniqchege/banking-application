import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap'; // 👈 Add this
import { loginUser, RegisterUser } from './core/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    NgbCollapse,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isMenuCollapsed = true;
  title = 'Bus Ticket Booking';
  currentYear: number = new Date().getFullYear();

  @ViewChild('loginModal') loginModal!: ElementRef;
  @ViewChild('navbarNav') navbarNav!: ElementRef;
  isLoginFormVisible = signal<boolean>(true);
  loggedInUser = signal<any>(null);

  registerObj: RegisterUser = {
    userId: 0,
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    mobileNo: '',
  };

  loginObj: loginUser = {
    email: '',
    password: '',
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser.set(JSON.parse(user));
    }
  }

  toggleForm() {
    this.isLoginFormVisible.set(!this.isLoginFormVisible());
  }

  closeNavbar() {
    const navbar = this.navbarNav?.nativeElement;
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  openModal() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'none';
    }
  }

  onRegister() {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = existingUsers.some(
      (user: any) => user.email === this.registerObj.email
    );
    if (userExists) {
      alert('User email already exists');
      return;
    }

    existingUsers.push(this.registerObj);

    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert('Registration Successful');
    this.isLoginFormVisible.set(true);
  }

  onLogin() {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const user = existingUsers.find(
      (u: any) =>
        u.email === this.loginObj.email && u.password === this.loginObj.password
    );
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.loggedInUser.set(user);

      this.closeModal();
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid email or password');
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUser.set(null);
    this.router.navigate(['/']);
  }

  toggleCollapseOnNavClick() {
    if (window.innerWidth < 992) {
      this.isMenuCollapsed = true;
    }
  }
}