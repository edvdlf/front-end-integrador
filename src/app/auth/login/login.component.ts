import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { AuthRequest } from '../models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { UsuarioLocalStorage } from '../../core/models/localstorage.model';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Message } from "primeng/message";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    PasswordModule, CheckboxModule, ButtonModule, DividerModule,
    FormsModule, ButtonModule, CheckboxModule,
    ToastModule,
    Message
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export default class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private localStorageService = inject(LocalStorageService);
  private messageService = inject(MessageService);
  
  submitted = false;


  loading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    lembrar: [true],
  });

  get f() {
    return this.loginForm.controls;
  }

  async submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

   

    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }

  const payload: AuthRequest = {
    userName: this.loginForm.get('email')?.value!,   // mapeia do form
    password: this.loginForm.get('senha')?.value!,
  };

  //console.log('Payload que será enviado:', payload);

    this.authService.authUser(payload).subscribe({
      next: (response) => {
        if (response) {
          
          this.cookieService.set('USER_INFO', response.accessToken);

          const obj: UsuarioLocalStorage = {
            id: response.id,
            usuario: response.username,
            role: response.role,
          };

          this.localStorageService.armazenarUsuario(obj);
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Bem-vindo de volta ${response.username}`,
            life: 2000,
          });
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Login ou usuário inválido! Tente novamente.',
          life: 2000,
        });
        console.error(err);
      },
    });
  }
}
