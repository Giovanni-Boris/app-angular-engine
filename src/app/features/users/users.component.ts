import { Component } from '@angular/core';
import { User } from '../../core/models/user.model';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { filterData } from '../../core/utils/filter.utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from "./add-user/add-user.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AddUserComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UsersService]
})
export class UsersComponent {
  searchTerm: string = '';
  title: string = '';
  showDeleteModal: boolean = false;
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  isEditing: boolean = false;
  headers: string[] = ['Usuario', 'Correo'];
  data: User[] = [];
  element: User | null = null;
  constructor(
    private readonly usersService: UsersService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.usersService.getAllUsers().subscribe(data => {
      this.data = data;
    });
  }

  get filteredData(): User[] | null {
    return filterData(this.data, this.searchTerm);
  }
  openAddUser() {
    this.showAddModal = !this.showAddModal;
    this.showEditModal = false;
    this.title = 'Agregar Usuario';
  }

  closeModalDelete() {
    this.showDeleteModal = false;
  }
}
