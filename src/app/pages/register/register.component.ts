import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  onRegister() {
    this.authService.register(this.username, this.password, this.email).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        alert('Registration successful!');
      },
      error: (err) => {
        console.error('Error registering user', err);
        alert('Registration failed: ' + err.error.message);
      },
    });
  }
}