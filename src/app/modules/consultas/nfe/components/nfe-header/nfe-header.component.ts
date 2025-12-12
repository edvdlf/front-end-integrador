import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-nfe-header',
  imports: [
    CommonModule,
    BadgeModule
  ],
  template:`
 
<div class="custom-card header-band flex align-items-center justify-content-between">
      
      <div class="text-group">
        <h2 class="title flex align-items-center gap-2">
          Consultas de Notas fiscais eletrônicas

          @if (totalRegistros !== null) {
              <span class="p-badge p-badge-info">
              {{ totalRegistros }}
           </span>
          }
        </h2>

        <p class="subtitle">
          A listagem abaixo exibe os documentos fiscais do tipo [NFE] que foram recuperados do sistema Taxdocs.
        </p>
      </div>

    </div>


  `
})
export class NfeHeaderComponent {

  @Input() totalRegistros: number | null = null;
}
