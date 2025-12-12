import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { NfseService } from '../../service/nfse-service';

@Component({
  selector: 'app-nfse-viewer-pdf',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  templateUrl: './nfse-viewer-pdf.component.html',
  styleUrl: './nfse-viewer-pdf.component.scss'
})
export class NfseViewerPdfComponent {
  @Input({ required: true }) processId!: string;
  @Input() nfseNumero: string = '';

  pdfSrc?: string; // string é aceita pelo [src] do ngx-extended-pdf-viewer
  carregando = false;
  temErroCarregarPdf = false;
  mensagemErro: string | null = null;

  constructor(
    private nfseService: NfseService,
    private messageService: MessageService
  ) {}

  /**
   * Método público chamado pelo componente pai via @ViewChild
   * assim que o p-dialog é exibido.
   */
  public carregarPdf(): void {
    if (!this.processId) {
      this.tratarErroLocal('ID da NFSe não informado.');
      return;
    }

    this.carregando = true;
    this.temErroCarregarPdf = false;
    this.mensagemErro = null;
    this.pdfSrc = undefined;

    this.nfseService.getPdf(this.processId).subscribe({
      next: (blob: Blob) => {
         console.log('Blob recebido:', blob);
         console.log('Tipo do blob:', blob.type, 'Tamanho:', blob.size);
        const fileUrl = URL.createObjectURL(blob);

        window.open(fileUrl, '_blank');
        this.pdfSrc = fileUrl;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar PDF da NFSe', err);
        this.tratarErroLocal(
          'Não foi possível carregar o PDF. Tente novamente mais tarde.'
        );
      },
    });
  }

  onPdfLoaded(_event: any): void {
    // Se quiser, pode logar algo aqui
     console.log('PDF carregado com sucesso', _event);
  }

  onErroCarregar(event: any): void {
    console.error('Erro ao renderizar o PDF no viewer', event);
    this.tratarErroLocal('Falha ao exibir o PDF no visualizador.');
  }

  onRecarregar(): void {
    this.carregarPdf();
  }

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
}
