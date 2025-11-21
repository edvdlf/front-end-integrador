import { Component, Input } from '@angular/core';
import { ErrosprocessmentoHeaderComponent } from "../errosprocessmento-header/errosprocessmento-header.component";
import { TableModule } from "primeng/table";
import { NFeResponse } from '../../../../consultas/nfe/models/nfe.model';
import { ErroProcessamentoDTO } from '../../models/erro-processamento.model';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Button } from "primeng/button";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-errosprocessmento-table',
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    Button
],
  templateUrl: './errosprocessmento-table.component.html',
  styleUrl: './errosprocessmento-table.component.scss'
})
export class ErrosprocessmentoTableComponent {
  
constructor(private messageService: MessageService) {}

  @Input() errosprocessamento: ErroProcessamentoDTO[] = [];
  @Input() loading = false;

  copiarMensagem(texto: string) {
  navigator.clipboard.writeText(texto);
  this.messageService.add({
    severity: 'success',
    summary: 'Copiado!',
    detail: 'Mensagem copiada para a área de transferência.'
  });
}


}
