import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from "primeng/card";
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Message } from "primeng/message";

@Component({
  selector: 'app-recupera-senha',
  imports: [
    CommonModule,
    Card,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    RippleModule,
    Message
],
  templateUrl: './recupera-senha.component.html',
  styleUrl: './recupera-senha.component.scss'
})
export class RecuperaSenhaComponent {

 carregando = false;
mensagemSucesso: string | null = null;
   _email=undefined;
submitted = false;

private formBuilder = inject(FormBuilder);
private authService = inject(AuthService);
private messageService= inject (MessageService);
private route= inject(ActivatedRoute);


  recuperarSenhaForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]

  });

  get f() {
    return this.recuperarSenhaForm.controls;
  }

  onSubmitOld(): void {
    if (this.recuperarSenhaForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe um e-mail válido.' });
      return;
    }
    this.carregando = true;
    let _email = this.recuperarSenhaForm.value.email as string;
    this.authService.recuperarSenha(_email).subscribe({
      next: (res) => {
        const mensagem = typeof res === 'string' ? JSON.parse(res).mensagem : res.mensagem;
        this.messageService.add({
           severity: 'success',
           summary: 'Sucesso',
           detail: 'Se o e-mail estiver cadastrado, um link de recuperação será enviado.' });
        this.carregando = false;
       
      },
      error: (err) => {
        const erro = err.error?.mensagem || 'Erro ao solicitar recuperação de senha.';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: erro });
        this.carregando = false;
      }
    });
  }

  

onSubmit(): void {
  if (this.recuperarSenhaForm.invalid) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Informe um e-mail válido.'
    });
    return;
  }

  this.carregando = true;
  this.mensagemSucesso = null; // limpa mensagens anteriores

  const email = this.recuperarSenhaForm.value.email as string;

  this.authService.recuperarSenha(email).subscribe({
    next: (res) => {
      // garante leitura da mensagem mesmo se a API retornar string ou objeto
      const mensagem =
        typeof res === 'string'
          ? JSON.parse(res).mensagem
          : res?.mensagem || 'Se o e-mail estiver cadastrado, enviamos um link.';

      // coloca a mensagem no HTML
      this.mensagemSucesso = mensagem;

      // opcional: manter messageService
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: mensagem
      });

      this.recuperarSenhaForm.reset();
      this.carregando = false;
    },

    error: (err) => {
      const erro =
        err?.error?.mensagem ||
        'Erro ao solicitar recuperação de senha.';

      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: erro
      });

      this.carregando = false;
    }
  });
}


}
