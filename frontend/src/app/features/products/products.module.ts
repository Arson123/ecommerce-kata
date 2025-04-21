import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent],
  imports: [CommonModule, FormsModule, ProductsRoutingModule],
  exports: [ProductListComponent, ProductCreateComponent],
})
export class ProductsModule {}
