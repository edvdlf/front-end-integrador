import { Component } from '@angular/core';


import { Subject, takeUntil } from 'rxjs';

import { NFeResponse } from '../models/nfe.model';
import { NfeService } from '../service/nfe-service';
import { NfeHeaderComponent } from '../components/nfe-header/nfe-header.component';
import { NfeTableComponent } from '../components/nfe-table/nfe-table.component';

@Component({
  selector: 'app-nfe',
  imports: [NfeHeaderComponent, NfeTableComponent],
  templateUrl: './nfe.component.html',
  styleUrl: './nfe.component.scss'
})
export class NfeComponent {

  private destroy$ = new Subject<void>();
  
    nfe: NFeResponse[] = [];
  
     constructor(private nfeService: NfeService) {}
    
   
    ngOnInit(): void {
      this.loadNFe();
      
    }
  
   
  
    private loadNFeOld(): void {
    this.nfeService.getAllNfe()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          // evita NG0100 — muda o valor no próximo tick
          queueMicrotask(() => {
            this.nfe = data ?? [];
            console.log('NFSe carregadas:', this.nfe.length);
            console.log('NFSe listadas:', this.nfe);
          });
        },
        error: (err) => console.error('Erro ao buscar NFSe:', err)
      });
  }

   private loadNFe(): void {
    this.nfeService.getAllNfe().subscribe({
      next: data => {
        this.nfe = data ?? [];
      },
      error: err => {
        console.error('[NFE] Erro ao carregar NF-es', err);
        this.nfe = [];
      }
    });
  }
  
    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
