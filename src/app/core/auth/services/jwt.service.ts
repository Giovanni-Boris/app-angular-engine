import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): string | null {
    return localStorage.getItem('jtwtoken');
  }

  saveToken(token: string): void {
    localStorage.setItem('jtwtoken', token);
  }

  destroyToken(): void {
    localStorage.removeItem('jtwtoken');
  }
}
