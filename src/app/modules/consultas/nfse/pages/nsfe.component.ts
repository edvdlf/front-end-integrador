import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { NsfeHeaderComponent } from '../components/nsfe-header/nsfe-header.component';
import { NsfeTableComponent } from '../components/nsfe-table/nsfe-table.component';
import { NFSeResponse } from '../models/nfse.model';
import { NfseService } from '../service/nfse-service';

@Component({
  selector: 'app-nsfe',
  imports: [NsfeHeaderComponent, NsfeTableComponent],
  templateUrl: './nsfe.component.html',
  styleUrl: './nsfe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NsfeComponent implements OnInit {

  private destroy$ = new Subject<void>();

  nfse: NFSeResponse[] = [];

   constructor(private nfseService: NfseService) {}
  
 
  ngOnInit(): void {
    this.loadNFSe();
    
  }

 

  private loadNFSe(): void {
  this.nfseService.getAllNfse()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        // evita NG0100 — muda o valor no próximo tick
        queueMicrotask(() => {
          this.nfse = data ?? [];
          console.log('NFSe carregadas:', this.nfse.length);
          console.log('NFSe listadas:', this.nfse);
        });
      },
      error: (err) => console.error('Erro ao buscar NFSe:', err)
    });
}

  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}


