import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productos: Product[] = []; // Lista de productos a mostrar

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Al inicializar, obtener la lista de productos desde el servicio
    this.productService.getProducts().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error obteniendo productos', err),
    });
  }

  /** Agrega un producto al carrito */
  agregarAlCarrito(producto: Product): void {
    this.cartService.addProduct(producto.id!, 1).subscribe({
      next: (updatedCart) => {
        console.log('Producto añadido al carrito');
        // En una aplicación real, podría actualizar un estado global del carrito o mostrar un mensaje de éxito.
      },
      error: (err) => console.error('Error al añadir al carrito', err),
    });
  }
}
