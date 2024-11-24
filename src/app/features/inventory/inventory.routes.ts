import { Route } from "@angular/router";
import { InventoryComponent } from "./inventory.component";
import { UsersComponent } from "../users/users.component";

export const inventoryRoutes: Route[] = [
  {
    path: 'inventario',
    component: InventoryComponent
  },
  {
    path: 'usuarios',
    component: UsersComponent
  },
  {
    path: '**',
    redirectTo: 'inventario',
    pathMatch: 'full'
  }
]
