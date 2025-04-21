import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  carrito: CartItem[] = [];  // Items actuales en el carrito

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Obtener el carrito al cargar el componente
    this.cartService.getCart().subscribe({
      next: (items) => this.carrito = items,
      error: (err) => console.error('Error obteniendo carrito', err)
    });
  }

  /** Elimina un producto del carrito */
  eliminarDelCarrito(item: CartItem): void {
    this.cartService.removeProduct(item.product.id!).subscribe({
      next: (updatedCart) => this.carrito = updatedCart,
      error: (err) => console.error('Error al eliminar del carrito', err)
    });
  }
}
