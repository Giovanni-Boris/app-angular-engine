import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent {
  authForm: FormGroup

  status: string = 'init'
  title: string = 'Iniciar Sesión'

  // Recaptcha
  validRecaptcha: boolean = false
  recaptchaToken!: string
  constructor(
    private readonly userService: UserService,
    private readonly feedbackService: FeedbackService,
    private readonly router: Router,
  ) {
    this.authForm = new FormBuilder().group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  signIn() {
    if (this.authForm.valid) {
      this.status = 'loading';
      this.userService.signIn(this.authForm.value as
        { username: string, password: string }).subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/inventario'])
            this.feedbackService.showSuccess('Inicio de sesión exitoso')
          },
          error: (err) => {
            if (err.status === 401) {
              this.feedbackService.showError('Credenciales incorrectas')
            }
            if (err.status === 500) {
              this.feedbackService.showError('Error al iniciar sesión')
            }
            this.status = 'error';
            this.feedbackService.showError('Error al iniciar sesión')
            console.log(err)
          }
        })
    }
  }
}
