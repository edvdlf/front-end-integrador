import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { catchError, finalize, Observable, of, shareReplay, Subject, takeUntil } from 'rxjs';
import { NFSeResponse } from '../models/nfse.model';
import { NfseService } from '../service/nfse-service';
import { CommonModule } from '@angular/common';
import { NfseTableComponent } from '../components/nfse-table/nfse-table.component';
import { NfseHeaderComponent } from '../components/nfse-header/nfse-header.component';

@Component({
  selector: 'app-nsfe',
  imports: [
    CommonModule,
    NfseHeaderComponent, NfseTableComponent],
  templateUrl: './nfse.component.html',
  styleUrl: './nfse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NfseComponent implements OnInit {

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


