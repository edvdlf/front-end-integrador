import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsuarioHeaderComponent } from "../components/usuario-header/usuario-header.component";

import { UsuarioService } from '../service/usuario-service';
import { ProgressSpinner } from "primeng/progressspinner";
import { CommonModule } from '@angular/common';
import { DeleteUsuarioAction, UsuarioResponse } from '../models/usuario.model';
import { UsuarioTabsComponent } from "../components/usuario-tabs/usuario-tabs.component";
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, 
    UsuarioHeaderComponent, 
    UsuarioTabsComponent,
    
  
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuarios: UsuarioResponse[] = [];
  loading = false;
  errorMsg = '';

  private readonly destroy$: Subject<void> = new Subject();
  private usuarioService =  inject(UsuarioService);
  private confirmationService =  inject(ConfirmationService);
   private messageService =  inject(MessageService);
   private dialogService= inject(DialogService);


  
  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.errorMsg = '';

    this.usuarioService.listarTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('[UsuarioComponent] Erro ao carregar usuários:', err);
        this.errorMsg = 'Não foi possível carregar a lista de usuários.';
        this.loading = false;
      }
    });
  }

onDeleteUsuario(event: DeleteUsuarioAction): void {
  console.log('Recebi do filho:', event);

 
   if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do usuário? "
         ${event?.nome}`,
        header: "Confirmação de Exclusão",
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteUsuario(event?.id),
        })
    }

  
}
  

  deleteUsuario(id: string) {
    if (id) {
      this.usuarioService
      .deleteUsuario(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
       next: (response) => {
       this.loadUsuarios();
            this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário excluído com sucesso!',
            life: 3000,
        });
        },
          error: (err) => {

          this.loadUsuarios();
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possivel excluir  o Usuário!',
            life: 3000,
          });
          },
        });
      this.loadUsuarios();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
