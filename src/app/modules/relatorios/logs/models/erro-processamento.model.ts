export interface ErroProcessamentoDTO {
  id: string;
  dataEvento: string;           // ou Date, se você converter no componente/serviço
  tipoDocumento: 'NFE' | 'CTE' | 'NFSE' | string;
  numeroDocumento: string;
  acao: string;
  mensagem: string;             // vem como JSON em formato de string
}

