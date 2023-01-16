import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseServerUrl = 'https://localhost:7153/api/';

  registerUser(): Observable<any> {
    return this.http.post(this.baseServerUrl + 'User/CreateUser', User, {
      responseType: 'text',
    });
  }
}

// https://localhost:7153/api/User/CreateUser
