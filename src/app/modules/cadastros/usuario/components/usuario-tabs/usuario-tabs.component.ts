import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { UsuarioFormComponent } from "../usuario-form/usuario-form.component";
import { UsuarioTableComponent } from "../usuario-table/usuario-table.component";
import { UsuarioResponse } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-tabs',
  imports: [
    CommonModule,
    TabsModule,
    UsuarioFormComponent,
    UsuarioTableComponent
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-tabs [(value)]="activeTab" class="w-full">
      <p-tablist>
        <p-tab value="0">
          <i class="pi pi-plus-circle mr-2"></i>
          Cadastrar Usuários
        </p-tab>
        <p-tab value="1">
          <i class="pi pi-search mr-2"></i>
          Visualizar Usuários
        </p-tab>
      </p-tablist>

      <p-tabpanels>
        <p-tabpanel value="0">
          <div class="col-12">
            <app-usuario-form/>
          </div>
        </p-tabpanel>

        <p-tabpanel value="1">
          <div class="col-12">
            <app-usuario-table
            
            />
          </div>
        </p-tabpanel>
      </p-tabpanels>
    </p-tabs>
  `,
})
export class UsuarioTabsComponent {

  activeTab: string = '0';
  @Input() usuarios: Array<UsuarioResponse> = [];

}
