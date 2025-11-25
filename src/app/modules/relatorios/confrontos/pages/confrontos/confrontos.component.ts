import { Component } from '@angular/core';
import { ConfrontosHeaderComponent } from "../../components/confrontos-header/confrontos-header.component";
import { ConfrontosTableComponent } from "../../components/confrontos-table/confrontos-table.component";
import { catchError, finalize, Observable, of, Subject } from 'rxjs';
import { DocumentoFiscalConfrontoDTO } from '../../models/confronto-models';
import { ConfrontosService } from '../../service/confrontos-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confrontos',
  imports: [
    CommonModule,
    ConfrontosHeaderComponent, ConfrontosTableComponent],
  templateUrl: './confrontos.component.html',
  styleUrl: './confrontos.component.scss'
})
export class ConfrontosComponent {


private destroy$ = new Subject<void>();

  loading = true;
  
  documentos: DocumentoFiscalConfrontoDTO[] = [];
  confrontos$!: Observable<DocumentoFiscalConfrontoDTO[]>;
  
   constructor(private confrontosService: ConfrontosService) {}
  
 
  ngOnInit(): void {
    this.loadConfrontos();

    
  }

 private loadConfrontos2(): void{

  this.documentos = []; // zera antes

  this.confrontosService
    .getAllConfrontosComDivergencias()
    .subscribe({
      next: (data) => {
        //this.documentos = data ?? [];
      },
      error: (err) => {
        console.error(err);
        this.documentos = [];
      }
    });

 }

loadConfrontos(): void{
  this.confrontos$ = this.confrontosService.getAllConfrontos().pipe(
        catchError(err => {
          console.error('[NFE] Erro ao carregar NF-es', err);
          return of<DocumentoFiscalConfrontoDTO[]>([]);
        }),
        finalize(() => this.loading = false)
      );

 }

 

 loadConfrontosComDivergenciasPorTipo(tipo: string) {
  console.log('Chamado pelo filho, tipo:', tipo);

   this.confrontos$ = this.confrontosService.getAllConfrontosComDivergenciasPorTipo(tipo).pipe(
        catchError(err => {
          console.error('[NFE] Erro ao carregar NF-es', err);
          return of<DocumentoFiscalConfrontoDTO[]>([]);
        }),
        finalize(() => this.loading = false)
      );
}


ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

  

}
