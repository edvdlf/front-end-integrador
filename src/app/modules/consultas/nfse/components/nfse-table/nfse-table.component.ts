import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NFSeResponse } from '../../models/nfse.model';
import { Dialog } from 'primeng/dialog';
import { NfseViewerPdfComponent } from '../nfse-viewer-pdf/nfse-viewer-pdf.component';
import { NfseService } from '../../service/nfse-service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nfse-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
   
    Button,
  ],
  templateUrl: './nfse-table.component.html',
  styleUrl: './nfse-table.component.scss',
})
export class NfseTableComponent {
  @Input() inputNFSeResponse: NFSeResponse[] = [];
  @Input() inputLoading = false;

  showPdfDialog = false;
  carregando = false; // checando Taxdocs
  selectedProcessId?: string;
  selectedNfseNumero?: string;

  @ViewChild('viewerPdf') viewerPdf?: NfseViewerPdfComponent;

  constructor(
    private nfseService: NfseService,
    private messageService: MessageService,
     private router: Router,

  ) {}

  
  abrirPdfoLD(processId: string): void {
    // Evita clique duplo enquanto já está checando
    if (this.carregando) {
      return;
    }

    this.carregando = true;

    this.nfseService
      .verificarSaudeTaxdocs()
      .pipe(
        // garante que o carregando volte para false em qualquer cenário
        finalize(() => (this.carregando = false))
      )
      .subscribe({
        next: (res) => {
          if (res?.status === 'OK') {
            // configura o estado para abrir o dialog PDF
            this.selectedProcessId = processId;
            this.selectedNfseNumero = processId
            this.showPdfDialog = true;
          } else {
            // Taxdocs respondeu, mas com instabilidade / erro lógico
            this.exibirAvisoInstabilidade(res?.mensagem);
          }
        },
        error: (err) => {
          // Taxdocs caiu, erro de rede, timeout, 5xx, etc.
          this.tratarErroTaxdocs(err);
        },
      });
  }

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

    this.nfseService.getPdf(processId).subscribe({
      next: (blob: Blob) => {
        console.log('Blob PDF NFSe recebido:', blob);

        const blobUrl = URL.createObjectURL(blob);
        const win = window.open(blobUrl, '_blank');

        if (!win) {
          // popup bloqueado
          this.messageService.add({
            severity: 'warn',
            summary: 'NFSe',
            detail: 'O navegador bloqueou a abertura da nova aba. Libere pop-ups para este site.'
          });
        }

        // limpa a URL depois de alguns segundos
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      },
      //error: (err) => {
       // console.error('Erro ao abrir PDF da NFSe:', err);
       // this.messageService.add({
       //   severity: 'error',
       //   summary: 'NFSe',
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

  // Chamado automaticamente quando o p-dialog termina de abrir
  onPdfDialogShow(): void {
    if (this.viewerPdf && this.selectedProcessId) {
      this.viewerPdf.carregarPdf();
    }
  }

  fecharPdfDialog(): void {
    //this.showPdfDialog = false;
  }

  // ------------------------------------------------------
  // Métodos auxiliares para organizar mensagens
  // ------------------------------------------------------

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
}
