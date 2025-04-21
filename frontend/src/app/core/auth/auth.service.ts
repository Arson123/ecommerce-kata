import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { LoginDTO, JwtPayload } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private _token = new BehaviorSubject<string | null>(localStorage.getItem('tk'));

  /** Stream para componentes que necesiten reaccionar al login/logout */
  token$ = this._token.asObservable();

  async login(dto: LoginDTO): Promise<void> {
    const { access } = await this.api.post<JwtPayload>('/auth/login', dto);
    localStorage.setItem('tk', access);
    this._token.next(access);
  }

  logout(): void {
    localStorage.removeItem('tk');
    this._token.next(null);
  }

  /** Token síncrono para interceptores/guards */
  get token(): string | null {
    return this._token.value;
  }
}
