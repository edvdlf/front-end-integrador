import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Accordion, AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfrontoDocumentoListaDTO, ConfrontoGrupoDTO, DocumentoFiscalConfrontoDTO } from '../../models/confronto-models';
import { ConfrontosService } from '../../service/confrontos-service';
import { Card } from "primeng/card";
import { Button } from "primeng/button";


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
    
],
  templateUrl: './confrontos-table.component.html',
  styleUrl: './confrontos-table.component.scss'
})
export class ConfrontosTableComponent implements OnInit {

  documentos: ConfrontoDocumentoListaDTO[] = [];
  loading = false;
  errorMsg: string | null = null;


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

 /* 
grupos = [
    { nome: 'Header', label: 'Cabeçalho (Header)' },
    { nome: 'Lines', label: 'Itens da Nota (Lines)' },
    { nome: 'Lines.TaxDetails', label: 'Impostos por Item (Lines.TaxDetails)' },
    { nome: 'Summary', label: 'Totais (Summary)' }
  ];

  confrontos: DocumentoFiscalConfronto[] = [
    {
      id: '1',
      documentoFiscalId: 'DOC-1',
      grupoInformacao: 'Header',
      lineCode: null,
      cfop: null,
      campo: 'Informações Complementares',
      valorOriginal: '',
      valorCalculado: 'ICMS/SP_Decreto nº 45.490/2000, Artigo 52, Inciso II',
      falha: true,
      descricaoDiferenca: 'Sim',
      criadoEm: '2025-11-14T18:34:56.254007'
    },
    {
      id: '2',
      documentoFiscalId: 'DOC-1',
      grupoInformacao: 'Lines',
      lineCode: 1,
      cfop: 6202,
      campo: 'Valor Unitário',
      valorOriginal: '176.4658196721',
      valorCalculado: '197.4995081967',
      falha: true,
      descricaoDiferenca: 'Sim',
      criadoEm: '2025-11-14T18:34:56.254007'
    },
    {
      id: '3',
      documentoFiscalId: 'DOC-1',
      grupoInformacao: 'Lines',
      lineCode: 1,
      cfop: 6202,
      campo: 'Total do Item',
      valorOriginal: '21528.83',
      valorCalculado: '24094.94',
      falha: true,
      descricaoDiferenca: 'Sim',
      criadoEm: '2025-11-14T18:34:56.254007'
    },
    {
      id: '4',
      documentoFiscalId: 'DOC-1',
      grupoInformacao: 'Lines.TaxDetails',
      lineCode: 1,
      cfop: 6202,
      campo: 'CST (ICMS)',
      valorOriginal: '00',
      valorCalculado: '90',
      falha: true,
      descricaoDiferenca: 'Sim',
      criadoEm: '2025-11-14T18:34:56.254007'
    },
    {
      id: '5',
      documentoFiscalId: 'DOC-1',
      grupoInformacao: 'Lines.TaxDetails',
      lineCode: 1,
      cfop: 6202,
      campo: 'Base de Cálculo (ICMS)',
      valorOriginal: '20452.39',
      valorCalculado: '24094.94',
      falha: true,
      descricaoDiferenca: 'Sim',
      criadoEm: '2025-11-14T18:34:56.254007'
    },
    {
      id: '6',
      documentoFiscalId: 'DOC-1',
      grupoInformacao: 'Summary',
      lineCode: null,
      cfop: null,
      campo: 'Valor Total dos Itens',
      valorOriginal: '21528.83',
      valorCalculado: '24094.94',
      falha: true,
      descricaoDiferenca: 'Sim',
      criadoEm: '2025-11-14T18:34:56.254007'
    }
  ];

  getConfrontosByGrupo(grupo: string): DocumentoFiscalConfronto[] {
    return this.confrontos.filter(c => c.grupoInformacao === grupo);
  }

  buildItemTitle(c: DocumentoFiscalConfronto): string {
    const partes: string[] = [];
    if (c.lineCode != null) partes.push(`Item ${c.lineCode}`);
    if (c.cfop != null) partes.push(`CFOP ${c.cfop}`);
    return partes.length ? partes.join(' • ') : 'Sem linha/CFOP';
  }
    */
}
