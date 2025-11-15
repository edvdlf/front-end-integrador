// src/app/confronto/confronto-models.ts
export interface DocumentoFiscalConfrontoDTO {
  id: string;
  documentoFiscalId: string;
  grupoInformacao: string;
  lineCode?: number | null;
  cfop?: number | null;
  campo: string;
  valorOriginal: string;
  valorCalculado: string;
  falha: boolean;
  descricaoDiferenca: string;
  criadoEm: string; // ISO string
}

export interface ConfrontoGrupoDTO {
  grupoInformacao: string;
  itens: DocumentoFiscalConfrontoDTO[];
}

export interface ConfrontoDocumentoListaDTO {
  documentoFiscalId: string;
  grupos: ConfrontoGrupoDTO[];
}
