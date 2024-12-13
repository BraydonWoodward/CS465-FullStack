import { Inject, Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}
  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token || ''; // Provide an empty string as a default if token is null
  }
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logs in a user and saves the received token
  public login(user: User): Observable<AuthResponse> {
    return this.tripDataService.login(user).pipe(
      tap((authResp: AuthResponse) => this.saveToken(authResp.token))
      // The tap operator allows us to perform side effects for each emitted value without modifying it.
    );
  }

  // Registers a user and saves the received token
  public register(user: User): Observable<AuthResponse> {
    return this.tripDataService.register(user).pipe(
      tap((authResp: AuthResponse) => this.saveToken(authResp.token))
    );
  }

  // Logs out a user by removing the token from local storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Checks if the user is logged in based on the expiration time of the JWT token
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);
        // Check if the expiration time is greater than the current time
      } catch (e) {
        // Handle decoding error, e.g., by logging it
        console.error('Error decoding token:', e);
        return false;
      }
    } else {
      return false;
    }
  }

  // Retrieves the current user information based on the logged-in status and JWT token
  public getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      try {
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
        // Extract the user's email and name from the token
      } catch (e) {
        // Handle decoding error, e.g., by logging it
        console.error('Error decoding token:', e);
        return null;
      }
    }
    return null;
  }
}