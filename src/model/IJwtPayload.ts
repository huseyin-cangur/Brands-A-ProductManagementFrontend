export interface JwtPayload {
  email: string;
  exp: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":
    | string
    | string[];
}