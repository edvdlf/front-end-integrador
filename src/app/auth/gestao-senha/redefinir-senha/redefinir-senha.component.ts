import { Component, inject, OnInit } from '@angular/core';
import { Password } from "primeng/password";
import { Button, ButtonModule } from "primeng/button";
import { Message } from "primeng/message";
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AlterarSenhaRequest, RedefinirSenhaRequest } from '../../models/auth.model';

@Component({
  selector: 'app-redefinir-senha',
  imports: [
    Password, 
    ButtonModule, 
    Message,
    CommonModule,
    Password,
    ReactiveFormsModule,
    Button,
   


  ],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.scss'
})
export class RedefinirSenhaComponent implements OnInit {
 


  private authService = inject(AuthService);
  private formBuilder = inject( FormBuilder);
  private router=  inject(Router);
  private messageService= inject (MessageService);
  private route= inject(ActivatedRoute);
  token: string | null = null;

 submitted= false;

   carregando = false;


  redefinirSenhaForm = this.formBuilder.group(
    {
    
    
    novaSenha: ['', Validators.required],
    confirmeNovaSenha: ['', Validators.required]
   },
   {
        validators: this.senhasIguaisValidator
    }

);

 ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

  }


get f() {
    return this.redefinirSenhaForm.controls;
  }

private senhasIguaisValidator(group: AbstractControl) {
    const senha = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmeNovaSenha')?.value;

    if (!senha || !confirmar) {
      return null;
    }

    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  onSubmit(): void {
      if (this.redefinirSenhaForm.invalid) {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe um e-mail válido.' });
        return;
      }
      this.carregando = true;
        const redefinirSenhaRequest: RedefinirSenhaRequest = {
            
            token: this.token as string, 
            novaSenha: this.redefinirSenhaForm.value.novaSenha as string,
  
        }
  
        console.log("DEBUGANDO" , redefinirSenhaRequest)
          this.submitRedifinirSenhaForm(redefinirSenhaRequest)
    }

     submitRedifinirSenhaForm(redefinirSenhaRequest: RedefinirSenhaRequest): void {
      if(this.redefinirSenhaForm.value && this.redefinirSenhaForm.valid){
       
        console.log("DEBUGANDO" , redefinirSenhaRequest)
        this.authService.redefinirSenha(redefinirSenhaRequest)
        .subscribe({
          next:(response)=>{
          if(response){
             this.redefinirSenhaForm.reset();
              this.messageService.add({
                severity:'success',
                summary: 'Sucesso',
                detail:`Senha redefinida com sucesso!`,
                life:2000,
                })
          }

        },
        error:(err) => {
          this.messageService.add({
            severity:'error',
            summary: 'Atenção',
            detail:`Não foi possivel redefinir a senha!`,
            life:2000,
            });
            console.log(err)
         }
      })
    }
  }


}
