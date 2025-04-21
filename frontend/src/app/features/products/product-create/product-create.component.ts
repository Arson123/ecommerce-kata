import { Component } from '@angular/core';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  // Objeto producto nuevo para enlazar con el formulario
  nuevoProducto: Product = {
    name: '',
    price: 0,
    description: ''
  };

  constructor(private productService: ProductService) {}

  /** Envía el formulario para crear un nuevo producto */
  onSubmit(): void {
    this.productService.createProduct(this.nuevoProducto).subscribe({
      next: (productoCreado) => {
        console.log('Producto creado:', productoCreado);
        // Reiniciar el formulario tras crear el producto exitosamente
        this.nuevoProducto = { name: '', price: 0, description: '' };
        // En una app real, podría navegar a la lista de productos o mostrar mensaje de éxito.
      },
      error: (err) => console.error('Error al crear producto', err)
    });
  }
}
