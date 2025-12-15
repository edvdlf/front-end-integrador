import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableModule } from "primeng/table";

import { DeleteErroProcessamentoAction, ErroProcessamentoDTO } from '../../models/erro-processamento.model';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

import { MessageService } from 'primeng/api';
import { Toolbar } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-errosprocessmento-table',
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    Toolbar,
    ButtonModule
],
  templateUrl: './errosprocessmento-table.component.html',
  styleUrl: './errosprocessmento-table.component.scss'
})
export class ErrosprocessmentoTableComponent {
  
constructor(private messageService: MessageService) {}

  @Input() data: ErroProcessamentoDTO[] = [];
  @Input() loading = false;
  
@Output() outPutDeleteRegistroErro = new EventEmitter<DeleteErroProcessamentoAction>();

copiarMensagem(texto: string) {
  navigator.clipboard.writeText(texto);
  this.messageService.add({
    severity: 'success',
    summary: 'Copiado!',
    detail: 'Mensagem copiada para a área de transferência.'
  });
}

handleDeleteErroProcessamentoEvent(erroProcessamento: ErroProcessamentoDTO): void {
  if (erroProcessamento.id && erroProcessamento.acao !== '') {
    this.outPutDeleteRegistroErro.emit({
      id: erroProcessamento.id,
      nome: erroProcessamento.acao
    });
  }
}
exportarExcel() {
    if (!this.data || this.data.length === 0) {
      console.warn("Nenhum dado para exportar.");
      return;
    }

    // 1) Converte para worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

    // 2) Cria a estrutura do Excel
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Erros_processamento': worksheet },
      SheetNames: ['Erros_processamento']
    };

    // 3) Gera arquivo binário
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    // 4) Salva arquivo
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(blob, `Erros_processamento_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

}
