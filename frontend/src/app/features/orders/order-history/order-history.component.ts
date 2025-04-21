import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../cart/cart.service';

interface Order {
  id: number;
  items: CartItem[];
  status: string;
  date: string;
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  ordenes: Order[] = []; // Lista de órdenes del usuario

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener las órdenes del usuario desde el backend
    this.http.get<Order[]>('/api/v1/orders').subscribe({
      next: (data) => (this.ordenes = data),
      error: (err) => console.error('Error obteniendo órdenes', err),
    });
  }
}
