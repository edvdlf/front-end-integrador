export interface UsuarioResponse {
  id?: string;              // opcional na criação
  nome: string;
  email: string;
  userName: string;
  enabled: boolean;
  ultimoAcesso?: string; 
  role:string;   // ISO string vinda do backend (OffsetDateTime)
}

 