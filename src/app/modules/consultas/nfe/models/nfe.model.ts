export interface NFePageResponse {
  value: NFeResponse[];
  count: number;
}

export interface NFeResponse {
  
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
