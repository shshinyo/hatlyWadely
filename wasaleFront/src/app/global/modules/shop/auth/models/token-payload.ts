export type UserType = "Admin" | "General" | "Client" | "Both" | "Pilot";

export interface ITokenPayload {
  sub?: string;

  email?: string;
  phone_number?: string;
  full_name?: string;
  userType?: UserType | UserType[];

  nbf?: number;
  exp: number;
  iat: number;
  iss?: string;
}
