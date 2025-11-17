import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { catchError, finalize, Observable, of, shareReplay, Subject, takeUntil } from 'rxjs';
import { NsfeHeaderComponent } from '../components/nsfe-header/nsfe-header.component';
import { NsfeTableComponent } from '../components/nsfe-table/nsfe-table.component';
import { NFSeResponse } from '../models/nfse.model';
import { NfseService } from '../service/nfse-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nsfe',
  imports: [
    CommonModule,
    NsfeHeaderComponent, NsfeTableComponent],
  templateUrl: './nsfe.component.html',
  styleUrl: './nsfe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NsfeComponent implements OnInit {

  private destroy$ = new Subject<void>();

  loading = true;
  nfse$!: Observable<NFSeResponse[]>;
  

   constructor(private nfseService: NfseService) {}
  
 
  ngOnInit(): void {
    this.loadNFSe();
    
  }

 private loadNFSe(): void{

  this.nfse$ = this.nfseService.getAllNfse().pipe(
        catchError(err => {
          console.error('[NFE] Erro ao carregar NF-es', err);
          return of<NFSeResponse[]>([]);
        }),
        finalize(() => this.loading = false)
      );

 }

 

  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}


