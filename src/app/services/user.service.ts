import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    console.log('UserService initialized');
  }

  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  addUser(user: { name: string; email: string }) {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }
}