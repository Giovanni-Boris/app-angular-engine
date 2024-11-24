import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { filterData } from '../../core/utils/filter.utils';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from "./add-product/add-product.component";
import { InventoryService } from '../../core/services/inventory.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddProductComponent,
    HttpClientModule
],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
  providers: [InventoryService]
})
export class InventoryComponent {

  searchTerm: string = '';
  title: string = '';
  showDeleteModal: boolean = false;
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  isEditing: boolean = false;
  headers: string[] = ['Código', 'Nombre', 'Descripción', 'Cantidad', 'Precio Unitario', 'Categoría', 'Acciones'];
  data: Product[] = [];
  element: Product | null = null;
  constructor(
    private readonly router: Router,
    private readonly inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.inventoryService.getProducts().subscribe(data => {
      this.data = data;
    });
  }

  get filteredData(): Product[] | null {
    return filterData(this.data, this.searchTerm);
  }
  openAddProduct() {
    this.showAddModal = !this.showAddModal;
    this.showEditModal = false;
    this.title = 'Agregar Producto';
  }

  openViewProduct(element: Product) {
    this.showEditModal = !this.showEditModal;
    this.showAddModal = false;
    this.title = 'Detalle del Producto';
    this.element = element;
    this.isEditing = true;
  }

  openModalDelete() {
    this.showDeleteModal = true;
  }

  closeModalDelete() {
    this.showDeleteModal = false;
  }
}
