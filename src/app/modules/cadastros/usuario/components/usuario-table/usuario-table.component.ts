import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { Card } from "primeng/card";

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
    Card
],
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss'
})
export class UsuarioTableComponent {


 //@Input() usuarios: Array<UsuariosResponse> = [];

//@Output() deleteUsuarioEvent = new EventEmitter<DeleteUsuarioAction>();
  handleDeleteUsuarioEvent(id: string, nome: string): void {
    if (id && nome !== '') {

      //this.deleteUsuarioEvent.emit({id, nome});
    }
  }



  getStatusText(enabled: boolean): string {
    return enabled ? 'Sim' : 'Não';
  }

  getStatusColor(enabled: boolean): string {
    return enabled ? '#006400' : '#FF0000'; // Verde escuro para desbloqueado e vermelho para bloqueado
  }


}
