import { Component } from '@angular/core';
import { Badge } from "primeng/badge";

@Component({
  selector: 'app-confrontos-header',
  
  template:`
 <div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Relatórios de confrontos </h2>
        <p class="subtitle">
          Gerencie os dados confrontados entre os documentos fiscais gerados e calculados pelo sistema Avatax.
          
        </p>
      </div>

</div>
  `
})
export class ConfrontosHeaderComponent {

}
