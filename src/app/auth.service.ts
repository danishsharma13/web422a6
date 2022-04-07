import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import jwt_decode from "jwt-decode";

import User from './User';
import RegisterUser from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public readToken() : User | null {
    const token = localStorage.getItem('access_token');

    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

  isAuthenticated() : boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user : User) : Observable<any> {
    const APIUrl = `${environment.userAPIBase}/login`;
    return this.http.post<any>(APIUrl, user);
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  public register(registerUser : RegisterUser): Observable<any> {
    const APIUrl = `${environment.userAPIBase}/register`;
    return this.http.post<any>(APIUrl, registerUser);
  }
}