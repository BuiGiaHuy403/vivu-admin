
export interface User {
  id?: string,
  userName?: string,
  role: string,
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // e.g., 'admin'
}

export interface JwtPayload {
  user_id: string;  
  exp: number;
  iat: number;
  role: 'admin' | 'user' |  string;
  [key: string]: unknown;
}


export interface LoginRequest {
  email: string,
  password: string,
}

export interface LoginResponse {
  token: string,
}