import { Component } from '@angular/core';

@Component({
  selector: 'app-errosprocessmento-header',
  imports: [],
  template:`
 <div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Relatórios de erros de processamento </h2>
        <p class="subtitle">
          Analise possíveis erros que possam ocorrer durante as ações de recuperação de documentos do Taxdocs, 
          realização de calculos de documentos pelo Avatax, ou processamentos internos.
        </p>
      </div>

</div>
  `
})
export class ErrosprocessmentoHeaderComponent {

}
