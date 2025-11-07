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
  
}
