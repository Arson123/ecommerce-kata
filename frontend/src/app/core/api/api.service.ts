import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.api;

  get<T>(url: string, params?: HttpParams) {
    return firstValueFrom(this.http.get<T>(`${this.base}${url}`, { params }));
  }

  post<T>(url: string, body: unknown) {
    return firstValueFrom(this.http.post<T>(`${this.base}${url}`, body));
  }

}
