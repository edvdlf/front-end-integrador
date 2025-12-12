import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, finalize, Observable, of, Subject } from 'rxjs';
import { NFSeResponse } from '../models/nfse.model';
import { NfseService } from '../service/nfse-service';
import { CommonModule } from '@angular/common';
import { NfseTableComponent } from '../components/nfse-table/nfse-table.component';
import { NfseHeaderComponent } from '../components/nfse-header/nfse-header.component';

@Component({
  selector: 'app-nfse',
  standalone: true,
  imports: [CommonModule, NfseHeaderComponent, NfseTableComponent],
  templateUrl: './nfse.component.html',
  styleUrl: './nfse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfseComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  loading = true;
  nfseResponse$!: Observable<NFSeResponse[]>;

  constructor(private nfseService: NfseService) {}

  ngOnInit(): void {
    this.loadNFSe();
  }

  private loadNFSe(): void {
    this.nfseResponse$ = this.nfseService.getAllNfse().pipe(
      catchError((err) => {
        console.error('[NFSE] Erro ao carregar NFSe', err);
        return of<NFSeResponse[]>([]);
      }),
      finalize(() => (this.loading = false))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
