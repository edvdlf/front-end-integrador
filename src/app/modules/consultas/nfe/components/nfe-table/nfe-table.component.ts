import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TableModule } from "primeng/table";

import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { NfeEventAction, NFeResponse } from '../../models/nfe.model';
import { ButtonModule } from "primeng/button";
import { NfeService } from '../../service/nfe-service';
import { MessageService } from 'primeng/api';
import { NFSeResponse } from '../../../nfse/models/nfse.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nfe-table',
  standalone:true,
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    ButtonModule
],
  templateUrl: './nfe-table.component.html',
  styleUrl: './nfe-table.component.scss'
})
export class NfeTableComponent {

  @Input() inputNFeResponse: NFeResponse[] = [];
  @Input() inputLoading = false;
  @Output() outPutRecuperarDocumento = new EventEmitter<string>();
 
  nfeSelected: NFeResponse[] = []; 

  get totalRegistros(): number {
    return this.inputNFeResponse?.length ?? 0;
  }

  private nfeService = inject(NfeService);
   private messageService = inject(MessageService);
   private router = inject (Router);

 

abrirDocumentoFiscalPdf(processId: string): void {
  if (!processId) {
    this.messageService.add({
      severity: 'warn',
      summary: 'NFe',
      detail: 'ID do processo da NFe não informado.'
    });
    return;
  }

  this.messageService.clear();
  this.messageService.add({
    severity: 'info',
    summary: 'NFe',
    detail: 'Carregando PDF da NFe...',
    life: 2000
  });

  this.nfeService.getNfePdf(processId).subscribe({
    next: (blob: Blob) => {
      console.log('Blob PDF NFe recebido:', blob);

      const blobUrl = URL.createObjectURL(blob);
      const win = window.open(blobUrl, '_blank');

      if (!win) {
        this.messageService.add({
          severity: 'warn',
          summary: 'NFe',
          detail: 'O navegador bloqueou a abertura da nova aba. Libere pop-ups para este site.'
        });
      }

      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    },

    error: (err: unknown) => {
      console.error('Erro ao abrir PDF da NFe:', err);

      const httpErr = err as HttpErrorResponse;

      this.router.navigate(['/relatorios-errosprocessamento'], {
        state: {
          origem: 'NFE_PDF',
          processId,
          status: httpErr?.status ?? null,
          mensagem:
            httpErr?.error?.mensagem ??
            httpErr?.message ??
            'Falha ao carregar PDF da NFe.',
          dataHora: new Date().toISOString()
        }
      });
    }
  });
}

  recuperarDocumentoFiscalNfe(id: string, nome:string) {
      if (id  !== '') {
         this.outPutRecuperarDocumento.emit(id);
      }
    }
}
