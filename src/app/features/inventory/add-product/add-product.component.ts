import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
import { InventoryService } from '../../../core/services/inventory.service';
import { FeedbackService } from '../../../core/services/feedback.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Input() showModal = false
  @Input() isEditing = false
  @Input() title = ''
  @Input() product: Product | null = null
  @Output() closeModalEvent = new EventEmitter()

  addProductForm: FormGroup

  @Output() status: string = 'init'

  constructor(
    private readonly addProductFormBuilder: FormBuilder,
    private readonly inventoryService: InventoryService,
    private readonly feedbackService: FeedbackService
  ) {
    this.addProductForm = this.addProductFormBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      categoria: [''],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.updateForm(this.product);
    }
  }
  private updateForm(product: Product) {
    this.addProductForm.patchValue({
      codigo: product.codigo,
      nombre: product.nombre,
      descripcion: product.descripcion,
      cantidad: product.cantidad,
      precioUnitario: product.precioUnitario,
      categoria: product.categoria
    })
  }

  onSubmit() {
    this.status = 'loading'
    if (this.addProductForm.valid) {
      const product: Product = this.addProductForm.value;
      if (this.isEditing) {
        this.inventoryService.updateProduct(product).subscribe(() => {
          this.closeModal()
        })
      } else {
        this.inventoryService.addProduct(product).subscribe({
          next: () => {
            this.status = 'success'
            this.closeModal()
            this.feedbackService.showSuccess("Producto agregado exitosamente")
          },
          error: (error) => {
            if (error.status === 400) {
              this.closeModal()
              this.feedbackService.showError("El producto ya existe")
            }
            this.closeModal()
            this.status = 'error'
            this.feedbackService.showError("Error al agregar el producto")
          }
        })
      }
    }
  }
  closeModal() {
    this.closeModalEvent.emit()
  }
}
