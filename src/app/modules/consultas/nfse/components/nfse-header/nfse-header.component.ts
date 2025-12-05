import { Component } from '@angular/core';

@Component({
  selector: 'app-nsfe-header',
  imports: [],
  template:`
 <div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Consultas de Notas fiscais eletrônicas de serviços</h2>
        <p class="subtitle">
          A listagem abaixo, exibe os documentos fiscais do tipo [NFSE] que foram recuperados do sistema Taxdocs.
        </p>
      </div>

</div>
  `
})
export class NfseHeaderComponent {

}
