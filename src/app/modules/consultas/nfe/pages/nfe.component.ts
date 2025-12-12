import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, Observable, of, Subject, takeUntil, tap } from 'rxjs';

import { NFeResponse } from '../models/nfe.model';
import { NfeService } from '../service/nfe-service';
import { NfeHeaderComponent } from '../components/nfe-header/nfe-header.component';
import { NfeTableComponent } from '../components/nfe-table/nfe-table.component';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nfe',
  standalone: true,
  imports: [
    CommonModule,
    NfeHeaderComponent,
    NfeTableComponent
  ],
  templateUrl: './nfe.component.html',
  styleUrl: './nfe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NfeComponent implements OnInit, OnDestroy{

  cdr = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);

  private destroy$ = new Subject<void>();

  //nfeResponse: NFeResponse[] = [];
  nfeResponse$!: Observable<NFeResponse[]>;

  loading = true;
  totalRegistros: number | null = null;


  private nfeService = inject(NfeService);
  private confirmationService = inject(ConfirmationService);
  
  ngOnInit(): void {
    this.loadNFe();
  }

   
  
    
  
    private loadNFe(): void {
      this.nfeResponse$ = this.nfeService.getAllNfe().pipe(
        catchError((err) => {
          console.error('[NFSE] Erro ao carregar NFSe', err);
          return of<NFeResponse[]>([]);
        }),
        finalize(() => (this.loading = false))
      );
    }

  recuperarDocumentoFiscal(id: string ): void {
    this.confirmationService.confirm({
      message: 'Confirma a recuperação do documento fiscal?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'nome',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.executeRecuperacaoDocumentoFiscal(id),
    });
  }

  executeRecuperacaoDocumentoFiscal(id: string) {
    if (id) {
      this.nfeService
        .recuperarDocumentoFiscalById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            // Apenas exibe uma mensagem informando que o processamento foi iniciado
            this.messageService.add({
              severity: 'info',
              summary: 'Processamento iniciado',
              detail:
                'O Efd Contribuicoes foi enviado para a fila de processamento.',
              life: 3000,
            });

            // Opcionalmente, recarregar a lista de processamentos em andamento
            this.loadNFe();
          },
          error: () => {
            // Apenas mostrar erro caso a requisição para enfileirar falhe
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail:
                'Falha ao enviar o Efd Contribuicoes para a fila de processamento.',
              life: 3000,
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
