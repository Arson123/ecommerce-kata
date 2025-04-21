import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [CommonModule, OrdersRoutingModule],
  exports: [OrderHistoryComponent],
})
export class OrdersModule {}
