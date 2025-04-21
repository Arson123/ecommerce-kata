import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../products/product.service';

// Interface para ítem del carrito de compras
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = '/api/v1/cart';

  constructor(private http: HttpClient) {}

  /** Agrega un producto al carrito (por defecto una unidad) */
  addProduct(productId: number, quantity: number = 1): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(this.apiUrl, { productId, quantity });
  }

  /** Elimina un producto del carrito */
  removeProduct(productId: number): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.apiUrl}/${productId}`);
  }

  /** Obtiene el contenido actual del carrito */
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }
}
