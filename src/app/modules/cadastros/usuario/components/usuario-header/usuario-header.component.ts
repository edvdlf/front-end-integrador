import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario-header',
  imports: [],
 template:`
<div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Gestão de usuários</h2>
        <p class="subtitle">
          Crie, atualize, exclua, ou bloqueie usuários.
        </p>
      </div>

</div>
  `
})
export class UsuarioHeaderComponent {

}
