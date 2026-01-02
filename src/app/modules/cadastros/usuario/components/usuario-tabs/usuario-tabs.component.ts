import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { UsuarioTableComponent } from '../usuario-table/usuario-table.component';
import { DeleteUsuarioAction, UsuarioRequest, UsuarioResponse } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-tabs',
  imports: [CommonModule, TabsModule, UsuarioFormComponent, UsuarioTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-tabs [(value)]="activeTab" class="w-full">
      
      <p-tablist>
        <p-tab value="0" data-cy="tab-cadastrar-usuarios">
          <i class="pi pi-plus-circle mr-2"></i>
          Cadastrar Usuários
        </p-tab>

        <p-tab value="1" data-cy="tab-visualizar-usuarios">
          <i class="pi pi-search mr-2"></i>
          Visualizar Usuários
        </p-tab>
      </p-tablist>

      <p-tabpanels>
        <p-tabpanel value="0">
          <div class="col-12">
            <app-usuario-form 
            (ativarAbaSolicitadoForms)="goToConsultas()"
            (createSolicitadoForms)="onCreateSolicitado($event)"
            />
          </div>
        </p-tabpanel>

        <p-tabpanel value="1">
          <div class="col-12">
            <app-usuario-table
            [usuarios]="usuarios"
            (deleteUsuario)="onDeleteUsuario($event)"
            
            />
            
  
          </div>
        </p-tabpanel>
      </p-tabpanels>
    </p-tabs>
  `,
})
export class UsuarioTabsComponent {
  //activeTab: string = '0';
  //@Input() usuarios: Array<UsuarioResponse> = [];
  //@Output() deleteUsuario = new EventEmitter<DeleteUsuarioAction>();
  //@Output() createSolicitadoTabs = new EventEmitter<UsuarioRequest>();
  //@Output() activeTabChange = new EventEmitter<string>();

  //onCreateSolicitado(item: UsuarioRequest) {
  //  this.createSolicitadoTabs.emit(item);
  //}

  //goToConsultas() {
   // this.activeTab = '0';
  //}

 // onDeleteUsuario(action: DeleteUsuarioAction): void {
    // repassa o evento para o componente pai
  //  this.deleteUsuario.emit(action);
 // }

 @Input() activeTab: string = '0';
  @Output() activeTabChange = new EventEmitter<string>();

  @Input() usuarios: Array<UsuarioResponse> = [];
  @Output() deleteUsuario = new EventEmitter<DeleteUsuarioAction>();
  @Output() createSolicitadoTabs = new EventEmitter<UsuarioRequest>();

  onCreateSolicitado(item: UsuarioRequest) {
    this.createSolicitadoTabs.emit(item);
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.activeTabChange.emit(tab);
  }

  goToConsultas() {
      this.setTab('1');
  }

  onDeleteUsuario(action: DeleteUsuarioAction): void {
    this.deleteUsuario.emit(action);
  }
}
