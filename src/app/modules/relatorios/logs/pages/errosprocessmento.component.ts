import { Component, OnInit } from '@angular/core';
import { ErrosprocessmentoHeaderComponent } from "../components/errosprocessmento-header/errosprocessmento-header.component";
import { ErrosprocessmentoTableComponent } from "../components/errosprocessmento-table/errosprocessmento-table.component";
import { catchError, finalize, Observable, of, Subject } from 'rxjs';
import { ErroProcessamentoDTO } from '../models/erro-processamento.model';
import { ErrosprocessmentoService } from '../service/errosprocessmento-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-errosprocessmento',
  imports: [ErrosprocessmentoHeaderComponent, ErrosprocessmentoTableComponent,
    CommonModule
  ],
  templateUrl: './errosprocessmento.component.html',
  styleUrl: './errosprocessmento.component.scss'
})
export class ErrosprocessmentoComponent implements OnInit {

  
  private destroy$ = new Subject<void>();
  
    loading = true;
    //errosprocessamento$!: Observable<ErroProcessamentoDTO[]>;

    errosprocessamento: ErroProcessamentoDTO[] = [];
    
  
     constructor(private errosprocessmentoService: ErrosprocessmentoService) {}
    
   
    ngOnInit(): void {
      this.loadErrosProcessamento();
      
    }

    loadErrosProcessamento(): void {
    this.loading = true;
    //this.errorMsg = '';

    this.errosprocessmentoService.getAllErrosProcessamentos()
    .subscribe({
      next: (data) => {
        this.errosprocessamento = data;
        this.loading = false;
        console.log("Listagem de erros: ", data)
      },
      error: (err) => {
        console.error('[UsuarioComponent] Erro ao carregar usuários:', err);
        //this.errorMsg = 'Não foi possível carregar a lista de usuários.';
        this.loading = false;
      }
    });
  }
  
   //private loadErrosProcessamento(): void{
  
    //this.errosprocessamento$ = this.errosprocessmentoService.getAllErrosProcessamentos().pipe(
      //    catchError(err => {
       //     console.error('[NFE] Erro ao carregar Erros de processamento', err);
       //     return of<ErroProcessamentoDTO[]>([]);
       //   }),
       //   finalize(() => this.loading = false)
      //  );
  
   //}
    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

}
