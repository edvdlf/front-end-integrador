import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NfseService } from '../../service/nfse-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nfse-viewer-pdf',
  imports: [
    CommonModule,
    PdfViewerModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './nfse-viewer-pdf.component.html',
  styleUrl: './nfse-viewer-pdf.component.scss'
})
export class NfseViewerPdfComponent {

   @Input() nfseId!: number;

  private nfsePdfService = inject(NfseService);
  private messageService = inject(MessageService);

  loading = false;
  errorMessage: string | null = null;

  // 👉 o que vai para o <pdf-viewer>
  pdfSrc: Uint8Array | null = null;

  // 👉 mantemos o Blob para download / impressão
  pdfBlob: Blob | null = null;
  pdfUrl: string | null = null;

  zoom = 1.0;

  ngOnInit(): void {
    if (this.nfseId == null) {
      this.errorMessage = 'ID da NFSe não informado.';
      return;
    }
    this.carregarPdf();
  }

  carregarPdf(): void {
    this.loading = true;
    this.errorMessage = null;
    alert("Chegou no carregaPDF " + this.nfseId)
    this.nfsePdfService.getPdf(this.nfseId).subscribe({
      next: (blob) => {
        this.pdfBlob = blob;
        this.pdfUrl = URL.createObjectURL(blob);

        // 👇 converte Blob -> ArrayBuffer -> Uint8Array
        blob.arrayBuffer().then((buffer) => {
          this.pdfSrc = new Uint8Array(buffer);
          this.loading = false;
        });
      },
      error: (err) => {
        console.error('Erro ao carregar PDF da NFSe', err);
        this.errorMessage = 'Não foi possível carregar o PDF desta NFSe.';
        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar o PDF da NFSe.',
        });
      },
    });
  }

  downloadPdf(): void {
    if (!this.pdfBlob) return;

    const a = document.createElement('a');
    a.href = this.pdfUrl!;
    a.download = `NFSE_${this.nfseId}.pdf`;
    a.click();
  }

  imprimirPdf(): void {
    if (!this.pdfUrl) return;

    const win = window.open(this.pdfUrl);
    const interval = setInterval(() => {
      if (!win) return;
      if (win.document.readyState === 'complete') {
        clearInterval(interval);
        win.print();
      }
    }, 300);
  }

  zoomIn(): void {
    this.zoom = this.zoom + 0.2;
  }

  zoomOut(): void {
    if (this.zoom > 0.4) this.zoom = this.zoom - 0.2;
  }

  resetZoom(): void {
    this.zoom = 1.0;
  }

}
