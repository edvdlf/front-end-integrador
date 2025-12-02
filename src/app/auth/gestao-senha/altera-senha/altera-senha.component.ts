import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../core/services/auth.service';
import { Card } from "primeng/card";
import { Password } from "primeng/password";
import { CommonModule } from '@angular/common';
import { Button } from "primeng/button";
import { AlterarSenhaRequest } from '../../models/auth.model';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Message } from "primeng/message";

@Component({
  selector: 'app-altera-senha',
  imports: [
    CommonModule,
    Password,
    ReactiveFormsModule,
    Button,
    Message
],
  templateUrl: './altera-senha.component.html',
  styleUrl: './altera-senha.component.scss'
})
export class AlteraSenhaComponent implements OnInit {
  submitted= false;

   carregando = false;
  

  private authService = inject(AuthService);
  private formBuilder = inject( FormBuilder);
    
  private messageService= inject (MessageService);
  private route= inject(ActivatedRoute);

  private localStorageService = inject(LocalStorageService);
  _email=undefined;

  alterarSenhaForm = this.formBuilder.group(
    {
    email:['', Validators.required],
    senhaAtual:  ['', Validators.required],
    novaSenha: ['', Validators.required],
    confirmeNovaSenha: ['', Validators.required]
   },
   {
        validators: this.senhasIguaisValidator
      }

);

get f() {
    return this.alterarSenhaForm.controls;
  }
  ngOnInit(): void {
    
    
    const usuarioLogado = this.localStorageService.getUsuarioLogado();

  if (usuarioLogado?.usuario) {
    // Preencher o e-mail automaticamente
    this.alterarSenhaForm.patchValue({
      email: usuarioLogado.usuario
    });
  }
  }

   onSubmit(): void {
    if (this.alterarSenhaForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe um e-mail válido.' });
      return;
    }
    this.carregando = true;
      const alterarSenhaRequest: AlterarSenhaRequest = {
          email: this.alterarSenhaForm.value.email as string,
          senhaAtual: this.alterarSenhaForm.value.senhaAtual as string,
          novaSenha: this.alterarSenhaForm.value.novaSenha as string,

      }

      console.log("DEBUGANDO" , alterarSenhaRequest)
        this.submitAlterarSenhaForm(alterarSenhaRequest)
  }

  private senhasIguaisValidator(group: AbstractControl) {
    const senha = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmeNovaSenha')?.value;

    if (!senha || !confirmar) {
      return null;
    }

    return senha === confirmar ? null : { senhasDiferentes: true };
  }




   submitAlterarSenhaForm(alterarSenhaRequest: AlterarSenhaRequest): void {
      if(this.alterarSenhaForm.value && this.alterarSenhaForm.valid){
       
        console.log("DEBUGANDO" ,alterarSenhaRequest)
        this.authService.alterarSenha(alterarSenhaRequest)
        .subscribe({
          next:(response)=>{
          if(response){
             this.alterarSenhaForm.reset();
              this.messageService.add({
                severity:'success',
                summary: 'Sucesso',
                detail:`Senha alterada com sucesso!`,
                life:2000,
                })
          }
        },
        error:(err) => {
          this.messageService.add({
            severity:'error',
            summary: 'Atenção',
            detail:`Não foi possivel alterar a senha!`,
            life:2000,
            });
            console.log(err)
         }
      })
    }
  }
  

}
