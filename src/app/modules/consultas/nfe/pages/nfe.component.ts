import { Component } from '@angular/core';
import { catchError, finalize, of, Subject, takeUntil, tap } from 'rxjs';

import { NFeResponse } from '../models/nfe.model';
import { NfeService } from '../service/nfe-service';
import { NfeHeaderComponent } from '../components/nfe-header/nfe-header.component';
import { NfeTableComponent } from '../components/nfe-table/nfe-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nfe',
  standalone: true,
  imports: [
    CommonModule,
    NfeHeaderComponent,
    NfeTableComponent
  ],
  templateUrl: './nfe.component.html',
  styleUrl: './nfe.component.scss'
})
export class NfeComponent {

  private destroy$ = new Subject<void>();

  data: NFeResponse[] = [];
  loading = true;
  totalRegistros: number | null = null;

  constructor(private nfeService: NfeService) { }

  ngOnInit(): void {
    this.loadNFe();
  }

  loadNFe(): void {
    this.loading = true;

    this.nfeService
      .getAllNfe()
      .pipe(
        tap((lista: NFeResponse[]) => {
          this.data = lista;
          this.totalRegistros = this.data.length;
        }),
        catchError(err => {
          console.error('Erro ao buscar NFes', err);
          this.data = [];
          this.totalRegistros = 0;
          return of([]);
        }),
        finalize(() => this.loading = false),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
