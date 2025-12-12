import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-nfe-viewer-pdf',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  
  templateUrl: './nfe-viewer-pdf.component.html',
  styleUrl: './nfe-viewer-pdf.component.scss'
})
export class NfeViewerPdfComponent {

}
