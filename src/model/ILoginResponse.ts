export interface AccessToken {
  token: string;
  expiration: string;
}

export interface LoginResponse {
  accessToken: AccessToken;
  refreshToken: string; 
  userId: string;
  email: string;
  fullName: string;
  roles: string[];
}