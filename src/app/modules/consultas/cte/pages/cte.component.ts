import { Component, OnDestroy, OnInit } from '@angular/core';

import { catchError, finalize, Observable, of, Subject, takeUntil } from 'rxjs';
import { CteTableComponent } from '../components/cte-table/cte-table.component';
import { CteHeadrComponent } from '../components/cte-header/cte-header.component';
import { CTeResponse } from '../models/cte.model';
import { CteService } from '../service/cte-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cte',
  imports: [
    CommonModule,
    CteHeadrComponent, CteTableComponent],
  templateUrl: './cte.component.html',
  styleUrl: './cte.component.scss'
})
export class CteComponent implements OnDestroy, OnInit{

   private destroy$ = new Subject<void>();
    
     

       loading = true;
        cteResponse$!: Observable<CTeResponse[]>;
    
       constructor(private cteService: CteService) {}
      
     
      ngOnInit(): void {
        this.loadCTe();
      }

      private loadCTe(): void{
        this.cteResponse$ = this.cteService.getAllCte().pipe(
        catchError(err => {
          console.error('[NFE] Erro ao carregar NF-es', err);
          return of<CTeResponse[]>([]);
        }),
        finalize(() => this.loading = false)
      );

      }
       
   
    
      ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
