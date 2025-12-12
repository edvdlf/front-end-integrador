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
 

   @Input() inputCteResponse: CTeResponse[] =[];
   @Input() inputLoading = false;


   /*
    abrirPdf(invoiceKey: string): void {
       
       if (this.carregando) {
         return;
       }
   
       this.carregando = true;
   
       this.cteService
         .verificarSaudeTaxdocs()
         .pipe(
           finalize(() => (this.carregando = false))
         )
         .subscribe({
           next: (res) => {
             if (res?.status === 'OK') {
               this.selectedCteId = invoiceKey;
               this.selectedCteNumero = String(invoiceKey); 
               this.showPdfDialog = true;
             } else {
                this.exibirAvisoInstabilidade(res?.mensagem);
             }
           },
           error: (err) => {
             // Taxdocs caiu, erro de rede, timeout, 5xx, etc.
             this.tratarErroTaxdocs(err);
           },
         });
     }
    */

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
      error: (err) => {
        console.error('Erro ao abrir PDF da NFSe:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'NFSe',
          detail: 'Não foi possível carregar o PDF da NFSe. Tente novamente mais tarde.'
        });
      }
    });
  }

  /*
     private exibirAvisoInstabilidade(mensagemBackend?: string): void {
    const detail =
      (mensagemBackend && mensagemBackend.trim()) ||
      'O Taxdocs está com instabilidade. Tente novamente em alguns minutos.';

    this.messageService.add({
      severity: 'warn',
      summary: 'Serviço Taxdocs',
      detail,
    });
  }
*/

/*
  private tratarErroTaxdocs(err: any): void {
    const status = err?.status as number | undefined;

    let detail: string;

    switch (status) {
      case 0:
        // Erro de rede / CORS / servidor fora do ar
        detail =
          'Não foi possível se conectar ao Taxdocs. Verifique sua conexão de rede ou tente novamente em alguns instantes.';
        break;
      case 503:
        detail =
          'O Taxdocs está temporariamente indisponível (503). Tente novamente em alguns minutos.';
        break;
      case 500:
        detail =
          'O Taxdocs retornou um erro interno (500). Se o problema persistir, entre em contato com o suporte.';
        break;
      case 404:
        detail =
          'Recurso não encontrado no Taxdocs (404). Verifique se a NFSe ainda está disponível no provedor.';
        break;
      default:
        detail =
          err?.error?.mensagem ||
          'O serviço Taxdocs está indisponível no momento. Tente novamente em alguns instantes.';
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Taxdocs indisponível',
      detail,
    });
  }
*/
/*
   onPdfDialogShow(): void {
    if (this.viewerPdf && this.selectedCteId) {
      this.viewerPdf.carregarPdf();
    }
  }
*/
/*
  fecharPdfDialog(): void {
    //this.showPdfDialog = false;
  }
*/   

}
