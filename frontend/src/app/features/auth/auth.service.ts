import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginDto { email: string; password: string; }
export interface JwtResponse { access: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/v1/auth';
  constructor(private http: HttpClient) {}

  login(dto: LoginDto): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.api}/login`, dto).pipe(
      tap(res => localStorage.setItem('token', res.access))
    );
  }
}
