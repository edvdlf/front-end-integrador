import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Accordion, AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfrontoDocumentoListaDTO, ConfrontoGrupoDTO, DocumentoFiscalConfrontoDTO } from '../../models/confronto-models';
import { ConfrontosService } from '../../service/confrontos-service';
import { Card } from "primeng/card";
import { Button } from "primeng/button";
import { TabsModule, Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface DocumentoFiscalConfronto {
  id: string;
  documentoFiscalId: string;
  grupoInformacao: string;
  lineCode: number | null;
  cfop: number | null;
  campo: string;
  valorOriginal: string;
  valorCalculado: string;
  falha: boolean;
  descricaoDiferenca: string;
  criadoEm: string;
}

@Component({
  selector: 'app-confrontos-table',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    Accordion,
    TableModule,
    TagModule,
    ProgressSpinnerModule,
    TableModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button
],
  templateUrl: './confrontos-table.component.html',
  styleUrl: './confrontos-table.component.scss'
})
export class ConfrontosTableComponent implements OnInit {


  documentos: ConfrontoDocumentoListaDTO[] = [];
  loading = false;
  errorMsg: string | null = null;

   @Input() data: DocumentoFiscalConfrontoDTO[] =[];
   @Input() loadingConfrontos = false;


  constructor(private confrontosService: ConfrontosService) { }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.errorMsg = null;

    this.confrontosService.listarTodosAgrupados().subscribe({
      next: (docs) => {
        
        this.documentos = docs;
        this.loading = false;
      },
      error: (err) => {
        console.error('[Confronto] Erro ao carregar confrontos', err);
        this.errorMsg = 'Erro ao carregar confrontos. Tente novamente mais tarde.';
        this.loading = false;
      }
    });
  }

  getFalhaSeverity(falha: boolean): 'success' | 'danger' {
    return falha ? 'danger' : 'success';
  }

  getFalhaLabel(falha: boolean, descricao: string): string {
    return descricao || (falha ? 'Com divergência' : 'OK');
  }

  getDocumentoHeader(doc: ConfrontoDocumentoListaDTO): string {
    return `Documento: ${doc.documentoFiscalId}`;
  }

  trackByDocumento(index: number, doc: ConfrontoDocumentoListaDTO): string {
    return doc.documentoFiscalId;
  }

  trackByGrupo(index: number, grupo: ConfrontoGrupoDTO): string {
    return grupo.grupoInformacao;
  }

  trackByItem(index: number, item: DocumentoFiscalConfrontoDTO): string {
    return item.id;
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
      Sheets: { 'Confrontos': worksheet },
      SheetNames: ['Confrontos']
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

    saveAs(blob, `confrontos_${new Date().toISOString().slice(0,10)}.xlsx`);
  }



}
