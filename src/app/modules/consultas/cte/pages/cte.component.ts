import { Component } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { CteTableComponent } from '../components/cte-table/cte-table.component';
import { CteHeadrComponent } from '../components/cte-header/cte-header.component';
import { CTeResponse } from '../models/cte.model';
import { CteService } from '../service/cte-service';


@Component({
  selector: 'app-cte',
  imports: [CteHeadrComponent, CteTableComponent],
  templateUrl: './cte.component.html',
  styleUrl: './cte.component.scss'
})
export class CteComponent {

   private destroy$ = new Subject<void>();
    
      cte: CTeResponse[] = [];
    
       constructor(private cteService: CteService) {}
      
     
      ngOnInit(): void {
        this.loadNFSe();
        
      }
    
     
    
      private loadNFSe(): void {
      this.cteService.getAllCte()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            // evita NG0100 — muda o valor no próximo tick
            queueMicrotask(() => {
              this.cte = data ?? [];
              console.log('NFSe carregadas:', this.cte.length);
              console.log('NFSe listadas:', this.cte);
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
