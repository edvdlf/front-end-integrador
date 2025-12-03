import { Component } from '@angular/core';

@Component({
  selector: 'app-cte-header',
  imports: [],
  template:`
 <div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Consultas de documentos fiscais de conhecimento de transporte eletrônico</h2>
        <p class="subtitle">
          A listagem abaixo, exibe os documentos fiscais do tipo [CTE] que foram recuperados do sistema Taxdocs.
        </p>
      </div>

</div>
  `
})
export class CteHeadrComponent {

}
