import { Component, inject, OnInit } from '@angular/core';
import { ErrosprocessmentoHeaderComponent } from "../components/errosprocessmento-header/errosprocessmento-header.component";
import { ErrosprocessmentoTableComponent } from "../components/errosprocessmento-table/errosprocessmento-table.component";
import { catchError, finalize, Observable, of, Subject, takeUntil } from 'rxjs';
import { DeleteErroProcessamentoAction, ErroProcessamentoDTO } from '../models/erro-processamento.model';
import { ErrosprocessmentoService } from '../service/errosprocessmento-service';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-errosprocessmento',
  imports: [ErrosprocessmentoHeaderComponent, ErrosprocessmentoTableComponent,
    CommonModule
  ],
  templateUrl: './errosprocessmento.component.html',
  styleUrl: './errosprocessmento.component.scss'
})
export class ErrosprocessmentoComponent implements OnInit {


  private destroy$ = new Subject<void>();

  loading = true;
  errosprocessamento$!: Observable<ErroProcessamentoDTO[]>;

  private errosprocessmentoService = inject(ErrosprocessmentoService);

  private confirmationService =  inject(ConfirmationService);
   private messageService =  inject(MessageService);

  ngOnInit(): void {
    this.loadErrosProcessamento();

  }

  private loadErrosProcessamento(): void {

    this.errosprocessamento$ = this.errosprocessmentoService.getAllErrosProcessamentos().pipe(
      catchError(err => {
        console.error('[NFE] Erro ao carregar Erros de processamento', err);
        return of<ErroProcessamentoDTO[]>([]);
      }),
      finalize(() => this.loading = false)
    );

  }

  onDeleteErroProcessamento(event: DeleteErroProcessamentoAction): void {
    console.log('Recebi do filho:', event);
  
   
     if (event) {
        this.confirmationService.confirm({
          message: `Confirma a exclusão do log de erros de processamento? "
           ${event?.nome}`,
          header: "Confirmação de Exclusão",
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          accept: () => this.deleteErroProcessamento(event?.id),
          })
      }
  
    
  }
    
  
    deleteErroProcessamento(id: string) {
      if (id) {
        this.errosprocessmentoService
        .deleteErrosProcessamentos(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
         next: (response) => {
         this.loadErrosProcessamento();
              this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Registro de erro de processamento excluído com sucesso!',
              life: 3000,
          });
          },
            error: (err) => {
  
            this.loadErrosProcessamento();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possivel excluir o Registro de erro de processamento!',
              life: 3000,
            });
            },
          });
        this.loadErrosProcessamento();
      }
    }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
