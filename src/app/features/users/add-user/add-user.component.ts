import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';
import { FeedbackService } from '../../../core/services/feedback.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  @Input() showModal = false
  @Input() title = ''
  @Input() user: User | null = null
  @Output() closeModalEvent = new EventEmitter()
  @Output() confirmDeleteEvent = new EventEmitter()

  addUserForm: FormGroup

  @Output() status: string = 'init'

  constructor(
    private readonly addUserFormBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly feedbackService: FeedbackService
  ) {
    this.addUserForm = this.addUserFormBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.status = 'loading'
    if (this.addUserForm.valid) {
      this.usersService.addUser(this.addUserForm.value).subscribe({
        next: () => {
          this.status = 'success'
          this.feedbackService.showSuccess("Usuario agregado exitosamente")
          this.closeModal()
        },
        error: (error) => {
          if (error.status === 400) {
            this.feedbackService.showError("El usuario ya existe")
            this.closeModal()
          }
          this.status = 'error'
          this.closeModal()
          this.feedbackService.showError("Error al agregar el producto")
        }
      })
    }
  }

  closeModal() {
    this.closeModalEvent.emit()
  }

}
