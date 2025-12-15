import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Accordion, AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfrontoDocumentoListaDTO, ConfrontoGrupoDTO, DocumentoFiscalConfrontoDTO } from '../../models/confronto-models';
import { ConfrontosService } from '../../service/confrontos-service';
import { Button } from "primeng/button";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ToolbarModule } from 'primeng/toolbar';
import { Badge } from "primeng/badge";
import { NfeService } from '../../../../consultas/nfe/service/nfe-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NfseService } from '../../../../consultas/nfse/service/nfse-service';
import { CteService } from '../../../../consultas/cte/service/cte-service';
import { Observable } from 'rxjs';


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

type TipoDocumentoFiscal = 'NFE' | 'NFSE' | 'CTE';

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
    Button,
    ToolbarModule,
    Badge
],
  templateUrl: './confrontos-table.component.html',
  styleUrl: './confrontos-table.component.scss'
})
export class ConfrontosTableComponent implements OnInit {



  documentos: ConfrontoDocumentoListaDTO[] = [];
  loading = false;
  errorMsg: string | null = null;

  @Input() data: DocumentoFiscalConfrontoDTO[] = [];
  @Input() loadingConfrontos = false;
  @Output() carregarPorTipo = new EventEmitter<string>();
   @Output() carregarTodos = new EventEmitter();

private nfeService = inject(NfeService);
private nfseService = inject(NfseService);
private cteService = inject(CteService);
private messageService = inject(MessageService);
private router = inject (Router);
private confrontosService =  inject(ConfrontosService);

  

  ngOnInit(): void {
    this.loadConfrontosComDivergencias();
  }

  loadConfrontosComDivergencias(): void {
    this.loading = true;
    this.errorMsg = null;

    this.confrontosService.getAllConfrontosComDivergenciasAgrupados().subscribe({
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

  loadConfrontosPorTipoDocumento(tipo:string): void {
    this.loading = true;
    this.errorMsg = null;

    this.confrontosService.getAllConfrontosComDivergenciasAgrupadosPorTipoDocumento(tipo).subscribe({
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
 
  emitirCarregamentoAll() {
    this.carregarTodos.emit();
  }
  emitirCarregamentoPorTipo(tipo: string) {
    this.carregarPorTipo.emit(tipo);
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

    saveAs(blob, `confrontos_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  abrirDocumentoFiscalPdf(processId: string, tipo: string): void {
  if (!processId) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Documento Fiscal',
      detail: 'ID do Documento fiscal não informado.'
    });
    return;
  }

  const tipoUpper = (tipo ?? '').toUpperCase() as TipoDocumentoFiscal;

  // escolhe o "getPdf" correto
  const pdfGetters: Record<TipoDocumentoFiscal, (id: string) => Observable<Blob>> = {
    NFE:  (id) => this.nfeService.getNfePdf(id),
    NFSE: (id) => this.nfseService.getPdf(id), 
    CTE:  (id) => this.cteService.getCtePdf(id)    
  };

  const getPdf = pdfGetters[tipoUpper];

  if (!getPdf) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Documento Fiscal',
      detail: `Tipo inválido: ${tipo}. Use NFE, NFSE ou CTE.`
    });
    return;
  }

  this.messageService.clear();
  this.messageService.add({
    severity: 'info',
    summary: tipoUpper,
    detail: 'Carregando PDF do documento fiscal...',
    life: 2000
  });

  getPdf(processId).subscribe({
    next: (blob: Blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const win = window.open(blobUrl, '_blank');

      if (!win) {
        this.messageService.add({
          severity: 'warn',
          summary: tipoUpper,
          detail: 'O navegador bloqueou a abertura da nova aba. Libere pop-ups para este site.'
        });
      }

      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    },

    error: (err: unknown) => {
      const httpErr = err as HttpErrorResponse;

      this.router.navigate(['/relatorios-errosprocessamento'], {
        state: {
          origem: `${tipoUpper}_PDF`,
          processId,
          status: httpErr?.status ?? null,
          mensagem:
            (httpErr as any)?.error?.mensagem ??
            httpErr?.message ??
            `Falha ao carregar PDF do ${tipoUpper}.`,
          dataHora: new Date().toISOString()
        }
      });
    }
  });
}




}
