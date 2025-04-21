// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  // 1. Ruta inicial redirige a 'login'
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // 2. Módulo de autenticación cargado perezosamente para '/login' (y '/register')
  { 
    path: 'login', 
    loadChildren: () => import('./features/auth/auth.module')
                        .then(m => m.AuthModule) 
  },

  // 3. Rutas protegidas con AuthGuard para el resto del sistema
  { 
    path: 'products', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./features/products/products.module')
                        .then(m => m.ProductsModule) 
  },
  { 
    path: 'cart', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./features/cart/cart.module')
                        .then(m => m.CartModule) 
  },
  { 
    path: 'orders', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./features/orders/orders.module')
                        .then(m => m.OrdersModule) 
  },

  // 4. Ruta comodín (404) redirige al login (puede ajustarse a una página 404 específica si se prefiere)
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
