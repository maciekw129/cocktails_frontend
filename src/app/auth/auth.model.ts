export interface AuthState {
  userData: UserData | null;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginAPI {
  access_token: string;
  refresh_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  login: string
  email: string
  firstName: string | null
  lastName: string | null
  password: string
}
