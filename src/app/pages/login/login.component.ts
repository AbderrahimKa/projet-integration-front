import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service'; // Make sure to import AuthService
import { Router } from '@angular/router'; // If you want to navigate after login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login success', response);
          // Handle the login success, maybe store a token, redirect user, etc.
          this.router.navigate(['/dashboard']); // Example redirect after successful login
        },
        (error) => {
          console.error('Login error', error);
          this.errorMessage = 'Invalid email or password'; // Display error to user
        }
      );
    } else {
      this.errorMessage = 'Please enter both email and password';
    }
  }
}
