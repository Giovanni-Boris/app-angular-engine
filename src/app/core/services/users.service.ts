import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api_url = environment.apiUrl + API_ENDPOINTS.users
  constructor(
    private readonly http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api_url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.api_url, user);
  }
}
