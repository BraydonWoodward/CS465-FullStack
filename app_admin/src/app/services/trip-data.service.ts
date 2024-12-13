import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError} from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }
  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = `${this.apiBaseUrl}/trips`;


  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }
  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.tripUrl , formData);
  }
  getTrip(tripCode: string): Observable<Trip[]> {
    // console.log('inside TripDataService::getTrips');
    return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
  }
  updateTrip(formData: Trip) : Observable<Trip> {
    // console.log('inside TripDataService::updateTrip()');
    return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData);
  }
  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    
    return this.http.post(url, user).pipe(
      map(response => response as AuthResponse),
      catchError(error => {
        console.error('An error occurred:', error);
        throw error; // You can also return a specific error object if needed
      })
    );
   
  }
  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

}
