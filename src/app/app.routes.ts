import { Routes } from '@angular/router';
import { InventoryRoutes } from './core/config/routes.constants';
import { LoginComponent } from './core/auth/login/login.component';
import { FeaturesComponent } from './features/features.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: InventoryRoutes.BASE,
    component: FeaturesComponent,
    loadChildren: () => import('./features/inventory/inventory.routes').then(m => m.inventoryRoutes),
    canActivate: [authGuard]
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: 'full'
  }
];
