import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, shareReplay, tap } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url = environment.apiUrl + API_ENDPOINTS.login

  public currentUserSubject = new BehaviorSubject<User | null>(null);

  private readonly currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  public isAuthenticatedSubject = this.currentUser.pipe(map(user => !!user));

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly jtwtService: JwtService
  ) { }
  signIn(credentials: {
    username: string,
    password: string,
  }): Observable<{ user: User }> {
    return this.http
      .post<{ user: User }>(this.api_url, {
        credentials
      }).pipe(
        tap(({ user }) => this.setAuth(user))
      )
  }

  setAuth(user: User): void {
    this.jtwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.jtwtService.destroyToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
