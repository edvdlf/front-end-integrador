import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TableModule } from "primeng/table";

import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { NfeEventAction, NFeResponse } from '../../models/nfe.model';
import { ButtonModule } from "primeng/button";
import { NfeService } from '../../service/nfe-service';
import { MessageService } from 'primeng/api';
import { NFSeResponse } from '../../../nfse/models/nfse.model';

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
      summary: 'NFSe',
      detail: 'Carregando PDF da NFe...',
      life: 2000
    });

    this.nfeService.getNfePdf(processId).subscribe({
      next: (blob: Blob) => {
        console.log('Blob PDF NFe recebido:', blob);

        const blobUrl = URL.createObjectURL(blob);
        const win = window.open(blobUrl, '_blank');

        if (!win) {
          // popup bloqueado
          this.messageService.add({
            severity: 'warn',
            summary: 'NFE',
            detail: 'O navegador bloqueou a abertura da nova aba. Libere pop-ups para este site.'
          });
        }

        // limpa a URL depois de alguns segundos
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      },
      error: (err) => {
        console.error('Erro ao abrir PDF da NFSe:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'NFe',
          detail: 'Não foi possível carregar o PDF da NFe. Tente novamente mais tarde.'
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
