export interface AuthRequest{
  userName: string;
  password: string;
}


export interface AuthResponse{
  id: string;
  username: string;
  authenticated: boolean;
  expiration:string;
  accessToken: string;
  refreshToken: string;
  role: string;
}

export interface AlterarSenhaRequest{
  email: string;
  senhaAtual: string;
  novaSenha: string;
}

export interface MensagemResponse {
  mensagem: string;
}

export interface RedefinirSenhaRequest{
  token: string;
  novaSenha: string;
}