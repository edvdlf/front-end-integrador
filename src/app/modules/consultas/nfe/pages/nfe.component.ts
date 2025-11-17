import { Component } from '@angular/core';

import { catchError, finalize, Observable, of, Subject, takeUntil, tap } from 'rxjs';

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
    NfeTableComponent],
  templateUrl: './nfe.component.html',
  styleUrl: './nfe.component.scss'
})
export class NfeComponent {

  private destroy$ = new Subject<void>();

  loading = true;
  nfe$!: Observable<NFeResponse[]>;

  constructor(private nfeService: NfeService) { }



  ngOnInit(): void {
    //this.loadNFe();
    this.nfe$ = this.nfeService.getAllNfe().pipe(
      catchError(err => {
        console.error('[NFE] Erro ao carregar NF-es', err);
        return of<NFeResponse[]>([]);
      }),
      finalize(() => this.loading = false)
    );


  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
