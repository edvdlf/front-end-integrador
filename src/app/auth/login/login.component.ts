import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from '../models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import { LocalStorageService, UsuarioLocalStorage } from '../../core/services/local-storage.service';
import { Message } from "primeng/message";
import { Password, PasswordModule } from "primeng/password";
import { Checkbox, CheckboxModule } from "primeng/checkbox";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  imports: [
  CommonModule, ReactiveFormsModule,
    PasswordModule, CheckboxModule, ButtonModule,
    FormsModule, ButtonModule, CheckboxModule,
    ToastModule,
    RouterLink,
    
  ],
})
export class LoginComponent {
  submitted = false;
  loading = false;

  loginForm!: FormGroup;

 constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      senha: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
      lembrar: this.fb.nonNullable.control(true),
    });
  }

  

  get f() {
    return this.loginForm.controls;
  }
  

  submit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (this.loading) return; // proteção extra contra duplo clique
    this.loading = true;

    const { email, senha } = this.loginForm.getRawValue();

    const payload: AuthRequest = {
      userName: email!,
      password: senha!,
    };

    this.messageService.clear();

    this.authService
      .authUser(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          if (!response) return;
          this.cookieService.set(
              'ACCESS_TOKEN',
                response.accessToken,
                1,       // 1 dia
                '/',     // path
                  undefined,
                  false,   // secure (true só se https)
                'Lax'    // SameSite
            );

          const obj: UsuarioLocalStorage = {
            id: response.id,
            usuario: response.username,
            role: response.role,
          };

          this.localStorageService.armazenarUsuario(obj);

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Bem-vindo de volta ${response.username}`,
            life: 2000,
          });

          this.submitted = false;
          this.loginForm.reset({ email: '', senha: '', lembrar: true });

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Login ou Usuário inválido! Tente novamente.',
            life: 5000,
          });
        },
      });
  }
}
