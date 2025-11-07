export interface NFePageResponse {
  value: CTeResponse[];
  count: number;
}

export interface CTeResponse {
  
  invoiceKey:   string;
  invoiceNumber: string;
  cnpjCpfIssuer: string;
  cnpjCpfRecipient: string;
   validSefaz: boolean,
   hasServices: boolean,
   operationType: number;
   totalInvoice: number;
   availableXML: boolean,
  issueDate: string; 
  entryDate: string; 
  validXmlStructure: boolean,
 
  
}
