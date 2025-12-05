import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NFSeResponse } from '../../models/nfse.model';
import { Dialog } from "primeng/dialog";
import { NfseViewerPdfComponent } from "../nfse-viewer-pdf/nfse-viewer-pdf.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nsfe-table',
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    Dialog,
    NfseViewerPdfComponent
],
  templateUrl: './nfse-table.component.html',
  styleUrl: './nfse-table.component.scss'
})
export class NfseTableComponent {

  showPdfDialog = false;
  selectedNfseId: number | null = null;

   @Input() data: NFSeResponse[] =[];
   @Input() loading = false;

   abrirPdf(row: any): void {
   
    this.selectedNfseId = row.invoiceNumber;   
    this.showPdfDialog = true;
  }

  fecharDialog(): void {
    this.showPdfDialog = false;
    this.selectedNfseId = null;
  }


   
   
}
