export interface NFSePageResponse {
  value: NFSeResponse[];
  count: number;
}

export interface NFSeResponse {
  
 processId: number;
 documentId: number;
 invoiceNumber: string;
 cnpjCpfIssuer: string;
 cnpjCpfRecipient: string;
 issueDate: string;
 entryDate: string; 
 operationType: number;
 totalInvoice: number;
 razaoSocialEmitente: string;
 razaoSocialDestinatario: string;
 serieRps: string;
}

export interface TaxdocsHealthResponse {
  status: string;      // OK, DEGRADED, OFFLINE
  codigo: string;
  mensagem: string;
  erroTecnico?: string;
}