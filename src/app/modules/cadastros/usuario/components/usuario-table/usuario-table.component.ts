import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { Card } from "primeng/card";
import { UsuarioResponse } from '../../models/usuario.model';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { UsuarioService } from '../../service/usuario-service';

@Component({
  selector: 'app-usuario-table',
  standalone:true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    //ProgressBarModule,
    TooltipModule,
    //ConfirmDialogModule,
    TagModule,
    Card,
    TableModule,
    
],
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss'
})
export class UsuarioTableComponent {

usuarios: UsuarioResponse[] = [];
  loading = false;
  errorMsg = '';

  constructor(private usuarioService: UsuarioService) {}

 //@Input() usuarios: Array<UsuarioResponse> = [];
  

//@Output() deleteUsuarioEvent = new EventEmitter<DeleteUsuarioAction>();
  handleDeleteUsuarioEvent(id: string, nome: string): void {
    if (id && nome !== '') {

      //this.deleteUsuarioEvent.emit({id, nome});
    }
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.errorMsg = '';

    this.usuarioService.listarTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('[UsuarioComponent] Erro ao carregar usuários:', err);
        this.errorMsg = 'Não foi possível carregar a lista de usuários.';
        this.loading = false;
      }
    });
  }


  getStatusText(enabled: boolean): string {
    return enabled ? 'Sim' : 'Não';
  }

  getStatusColor(enabled: boolean): string {
    return enabled ? '#006400' : '#FF0000'; // Verde escuro para desbloqueado e vermelho para bloqueado
  }


}
