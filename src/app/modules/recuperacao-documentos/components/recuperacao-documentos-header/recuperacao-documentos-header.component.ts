import { Component } from '@angular/core';

@Component({
  selector: 'app-recuperacao-documentos-header',
  imports: [],
  template:`
 
<div class="custom-card header-band flex align-items-center justify-content-between">
      
      <div class="text-group">
        <h2 class="title flex align-items-center gap-2">
        Recuperação de documentos fiscais 

          
        </h2>

        <p class="subtitle">
          A tela abaixo, permite que o usuário realize uma recuperação de documentos  do tipo, [NFe], [NFSe] ou [CTe], diretamente no sistema Taxdocs.
        </p>
      </div>

    </div>


  `
})
export class RecuperacaoDocumentosHeaderComponent {

}
