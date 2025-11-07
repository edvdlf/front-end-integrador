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

