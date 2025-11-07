import { Component } from '@angular/core';

@Component({
  selector: 'app-nfe-header',
  imports: [],
  template:`
 <div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Consultas de Notas fiscais eletrônicas</h2>
        <p class="subtitle">
          Gerencie as Notas fiscais eletrônicas.
        </p>
      </div>

</div>
  `
})
export class NfeHeaderComponent {

}
