import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  ngOnInit() { }
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }
  // Handles the login logic
  private doLogin(): void {
    // Call the login method from AuthenticationService and subscribe to its observable
    this.authenticationService.login(this.credentials).subscribe(
      (authResponse: AuthResponse) => {
        // Handle successful login
        this.router.navigateByUrl('#'); // Redirect to a new page upon successful login
      },
      (error: any) => {
        // Handle login error
        this.formError = 'Login failed. Please try again.';
        console.error('Login error:', error); // Log the error for debugging purposes
      }
    );
  }

  // Handles form submission and calls doLogin method
  onSubmit(): void {
    this.doLogin();
  }
}

