import { Component } from '@angular/core';
import { ConfrontosHeaderComponent } from "../../components/confrontos-header/confrontos-header.component";
import { ConfrontosTableComponent } from "../../components/confrontos-table/confrontos-table.component";

@Component({
  selector: 'app-confrontos',
  imports: [ConfrontosHeaderComponent, ConfrontosTableComponent],
  templateUrl: './confrontos.component.html',
  styleUrl: './confrontos.component.scss'
})
export class ConfrontosComponent {

  //public processamentoSpedFiscalDatas: Array<ProcessamentoSpedFiscalResponse> = [];


  //getProcessamentoSpedFiscalDatas(): void {
   // this.spedFiscalService
  //    .getAllProcessamentoSpedFiscal()
   //          .subscribe({
   //     next: (response) => {
   //       if (response.length >= 0) {
   //         console.log(response)
   //         this.processamentoSpedFiscalDatas = response;
   //       }
   //     },
   //     error: (err) => {
   //       console.log(err);
    //      this.messageService.add({
   //         severity: 'error',
   //         summary: 'Erro',
  //          detail: 'Não foi possivel buscar arquivo sped fiscal importados!',
  //          life: 2500,
  //        });
  //      },
  //    });
  //}

}
