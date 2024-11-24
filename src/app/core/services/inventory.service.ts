import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { environment } from '../../../environments/environment';

interface ApiResponse {
  data: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  api_url = environment.apiUrl + API_ENDPOINTS.inventory
  constructor(
    private readonly http: HttpClient
  ) { }

  getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.api_url);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api_url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api_url}/${product.codigo}`, product);
  }
}
