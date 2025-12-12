import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, inject } from '@angular/core';
import { NgxExtendedPdfViewerModule, PdfLoadedEvent } from 'ngx-extended-pdf-viewer';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CteService } from '../../service/cte-service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cte-viewer-pdf',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  templateUrl: './cte-viewer-pdf.component.html',
  styleUrl: './cte-viewer-pdf.component.scss',
})
export class CteViewerPdfComponent implements OnDestroy {
  @Input({ required: true }) invoiceKey!: string;
  @Input() cteNumero = '';

  pdfSrc?: string;        // Aceita string no [src] do ngx-extended-pdf-viewer
  private objectUrl?: string;

  carregando = false;
  temErroCarregarPdf = false;
  mensagemErro: string | null = null;

  private readonly cteService = inject(CteService);
  private readonly messageService = inject(MessageService);

  // ------------------------------------------------------
  // Carregamento do PDF
  // ------------------------------------------------------
  public carregarPdf(): void {
  if (!this.invoiceKey) {
    this.tratarErroLocal('ID da CTE não informado.');
    return;
  }

  // Atualizações síncronas OK
  this.carregando = true;
  this.temErroCarregarPdf = false;
  this.mensagemErro = null;
  this.limparObjectUrl();
  this.pdfSrc = undefined;

  this.cteService.getCtePdf(this.invoiceKey).subscribe({
    next: (blob: Blob) => {
      const fileUrl = URL.createObjectURL(blob);
      this.objectUrl = fileUrl;

      // 🔥 forçando atualização no PRÓXIMO ciclo → sem NG0100
      setTimeout(() => {
        this.pdfSrc = fileUrl;
        this.carregando = false;
      });
    },
    error: (err: HttpErrorResponse) => {
      console.error('Erro ao buscar PDF da CTE', err);
      const msgUsuario = this.mensagemAmigavelPorStatus(err);

      // 🔥 também empurramos o erro para o próximo ciclo
      setTimeout(() => {
        this.tratarErroLocal(msgUsuario);
      });
    },
  });
}


  // ------------------------------------------------------
  // Eventos do viewer
  // ------------------------------------------------------
  onPdfLoaded(event: PdfLoadedEvent): void {
    console.log('PDF carregado com sucesso', event);
  }

  onErroCarregar(event: unknown): void {
    console.error('Erro ao renderizar o PDF no viewer', event);
    this.tratarErroLocal('Falha ao exibir o PDF no visualizador.');
  }

  onRecarregar(): void {
    this.carregarPdf();
  }

  // ------------------------------------------------------
  // Tratamento de erro e limpeza
  // ------------------------------------------------------
  private tratarErroLocal(msg: string): void {
  this.carregando = false;
  this.temErroCarregarPdf = true;
  this.mensagemErro = msg;

  this.messageService.add({
    severity: 'error',
    summary: 'Erro',
    detail: msg,
    life: 4000,
  });
}


  private mensagemAmigavelPorStatus(err: HttpErrorResponse): string {
    if (err.status === 404) {
      return 'PDF da CTE não encontrado. Verifique se o documento já foi gerado no Taxdocs.';
    }
    if (err.status === 500) {
      return 'Serviço do Taxdocs indisponível no momento. Tente novamente em alguns instantes.';
    }
    return 'Não foi possível carregar o PDF. Tente novamente mais tarde.';
  }

  private limparObjectUrl(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = undefined;
    }
  }

  // ------------------------------------------------------
  // Ciclo de vida
  // ------------------------------------------------------
  ngOnDestroy(): void {
    this.limparObjectUrl();
  }
}
