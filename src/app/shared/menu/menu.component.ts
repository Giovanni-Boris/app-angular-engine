import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InventoryRoutes } from '../../core/config/routes.constants';
import { UserService } from '../../core/auth/services/user.service';
import { HttpClientModule } from '@angular/common/http';

interface MenuItem {
  label: string;
  icon: string;
  base?: string;
  route?: string;
  onClick?: () => void;
  isOpen?: boolean;
  children?: MenuItem[];
}
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [UserService]
})
export class MenuComponent {
  isOpen = false;
  user = '';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  menuItems: MenuItem[] = [
    {
      label: 'Inventario',
      icon: 'M10.591 2.513a3.75 3.75 0 0 1 2.818 0l7.498 3.04A1.75 1.75 0 0 1 22 7.175v9.653a1.75 1.75 0 0 1-1.093 1.621l-7.498 3.04a3.75 3.75 0 0 1-2.818 0l-7.498-3.04A1.75 1.75 0 0 1 2 16.827V7.176a1.75 1.75 0 0 1 1.093-1.622zm2.254 1.39a2.25 2.25 0 0 0-1.69 0L9.24 4.68l7.527 2.927l2.669-1.03zm1.846 4.505L7.215 5.5L4.59 6.564l7.411 2.882zM3.5 16.828a.25.25 0 0 0 .156.231l7.499 3.04q.047.02.095.036v-9.371L3.5 7.75zm9.345 3.271l7.499-3.04a.25.25 0 0 0 .156-.232V7.774l-7.75 2.992v9.37z',
      base: InventoryRoutes.BASE,
      route: InventoryRoutes.INVENTORY,
      isOpen: false,
    },
    {
      label: 'Usuarios',
      icon: 'M12.3 12.22A4.92 4.92 0 0 0 14 8.5a5 5 0 0 0-10 0a4.92 4.92 0 0 0 1.7 3.72A8 8 0 0 0 1 19.5a1 1 0 0 0 2 0a6 6 0 0 1 12 0a1 1 0 0 0 2 0a8 8 0 0 0-4.7-7.28M9 11.5a3 3 0 1 1 3-3a3 3 0 0 1-3 3m9.74.32A5 5 0 0 0 15 3.5a1 1 0 0 0 0 2a3 3 0 0 1 3 3a3 3 0 0 1-1.5 2.59a1 1 0 0 0-.5.84a1 1 0 0 0 .45.86l.39.26l.13.07a7 7 0 0 1 4 6.38a1 1 0 0 0 2 0a9 9 0 0 0-4.23-7.68',
      base: InventoryRoutes.BASE,
      route: InventoryRoutes.USERS,
    }
  ];

  salir: MenuItem[] = [
    {
      label: 'Salir',
      icon: 'm17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z',
      onClick: () => this.logout(),
    }
  ];

  loadUser() {
    this.user = localStorage.getItem('username') ?? '';
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.userService.logout();
  }

  clickItem(item: MenuItem) {
    if (item.onClick) {
      item.onClick();
    }
    const route = (item.base ?? '') + (item.route ?? '');
    this.router.navigate([route]);
  }
}
