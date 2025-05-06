import { Component, computed, ElementRef, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap'; // 👈 Add this
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbCollapse,
    RouterOutlet, RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isMenuCollapsed = true;
  title = 'BankingApp';
  currentYear: number = new Date().getFullYear();

  @ViewChild('loginModal') loginModal!: ElementRef;
  @ViewChild('navbarNav') navbarNav!: ElementRef;
  isLoginFormVisible = signal<boolean>(true);
  loggedInUser = signal<any>(null);

  navItems = [
    { label: 'Customers', link: '/customer' },
    { label: 'Account', link: '/account' },
    { label: 'Standing Order', link: '/standing-order' },
    { label: 'Run Scheduler', link: '/scheduler' },
  ];

  registerObj = {
    userId: 0,
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    mobileNo: '',
  };

  loginObj = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private authService: AuthService) {}
  isLoggedIn = computed(() => this.loggedInUser() !== null);


  ngOnInit() {
    this.loggedInUser.set(this.authService.getLoggedInUser());
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
    const userExists = this.authService.checkUserExists(this.registerObj.email);
    if (userExists) {
      alert('User email already exists');
      return;
    }

    this.authService.registerUser(this.registerObj);
    alert('Registration Successful');
    this.isLoginFormVisible.set(true);
  }

  onLogin() {
    const user = this.authService.authenticateUser(this.loginObj.email, this.loginObj.password);
    if (user) {
      this.loggedInUser.set(user);
      this.closeModal();
      this.router.navigate(['/customer']);
    } else {
      alert('Invalid email or password');
    }
  }

  logout() {
    this.authService.logout();
    this.loggedInUser.set(null);
    this.router.navigate(['/']);
  }

  toggleCollapseOnNavClick() {
    if (window.innerWidth < 992) {
      this.isMenuCollapsed = true;
    }
  }

  isHomePage() {
    return this.router.url === '/';
  }
}
