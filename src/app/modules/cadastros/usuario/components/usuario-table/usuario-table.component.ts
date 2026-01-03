import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { Card } from "primeng/card";
import { DeleteUsuarioAction, UsuarioResponse } from '../../models/usuario.model';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { UsuarioService } from '../../service/usuario-service';

@Component({
  selector: 'app-usuario-table',
  standalone:true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    TagModule,
    TableModule,
    
],
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss'
})
export class UsuarioTableComponent {

@Input() usuarios: UsuarioResponse[] = [];   // ✅ vem do pai
  @Input() loading = false;                   // opcional (se quiser)
  @Input() errorMsg = '';                     // opcional (se quiser)

  @Output() deleteUsuario = new EventEmitter<DeleteUsuarioAction>();

  handleDeleteUsuarioEvent(usuario: UsuarioResponse): void {
    if (usuario.id && usuario.nome) {
      this.deleteUsuario.emit({ id: usuario.id, nome: usuario.nome });
    }
  }

  getStatusText(enabled: boolean): string {
    return enabled ? 'Sim' : 'Não';
  }

  getStatusColor(enabled: boolean): string {
    return enabled ? '#006400' : '#FF0000';
  }
}
