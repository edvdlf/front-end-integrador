export interface UsuarioResponse {
  id?: string;              // opcional na criação
  nome: string;
  email: string;
  userName: string;
  enabled: boolean;
  ultimoAcesso?: string; 
  role:string;   // ISO string vinda do backend (OffsetDateTime)
}

export interface UsuarioRequest {
             // opcional na criação
  nome: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string ;
  password: string;
  enabled: boolean;
  role:string;   // ISO string vinda do backend (OffsetDateTime)
}

 export interface DeleteUsuarioAction {
   id: string;
   nome:string;
}
