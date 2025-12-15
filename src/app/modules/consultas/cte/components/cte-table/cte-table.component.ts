import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NFSeResponse } from '../../../nfse/models/nfse.model';
import { CTeResponse } from '../../models/cte.model';
import { ButtonModule } from "primeng/button";
import { CteViewerPdfComponent } from '../cte-viewer-pdf/cte-viewer-pdf.component';
import { MessageService } from 'primeng/api';
import { CteService } from '../../service/cte-service';
import { finalize } from 'rxjs';
import { Dialog } from "primeng/dialog";
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cte-table',
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    ButtonModule,
   
],
  templateUrl: './cte-table.component.html',
  styleUrl: './cte-table.component.scss'
})
export class CteTableComponent {

  showPdfDialog = false;
  carregando = false; // checando Taxdocs
  selectedCteId?: string;
  selectedCteNumero?: string;

  @ViewChild('viewerPdf') viewerPdf?: CteViewerPdfComponent;

  private messageService = inject(MessageService);
  private cteService = inject(CteService);
  private router= inject(Router);

   @Input() inputCteResponse: CTeResponse[] =[];
   @Input() inputLoading = false;


  

  abrirDocumentoFiscalPdf(processId: string): void {
    if (!processId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'NFSe',
        detail: 'ID do processo da NFSe não informado.'
      });
      return;
    }

    this.messageService.clear();
    this.messageService.add({
      severity: 'info',
      summary: 'NFSe',
      detail: 'Carregando PDF da NFSe...',
      life: 2000
    });

    this.cteService.getCtePdf(processId).subscribe({
      next: (blob: Blob) => {
        console.log('Blob PDF CTE recebido:', blob);

        const blobUrl = URL.createObjectURL(blob);
        const win = window.open(blobUrl, '_blank');

        if (!win) {
          // popup bloqueado
          this.messageService.add({
            severity: 'warn',
            summary: 'CTe',
            detail: 'O navegador bloqueou a abertura da nova aba. Libere pop-ups para este site.'
          });
        }

        // limpa a URL depois de alguns segundos
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      },
      //error: (err) => {
      //  console.error('Erro ao abrir PDF da NFSe:', err);
      //  this.messageService.add({
       //   severity: 'error',
      //    summary: 'NFSe',
       //   detail: 'Não foi possível carregar o PDF da NFSe. Tente novamente mais tarde.'
       // });
      //}
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


}
