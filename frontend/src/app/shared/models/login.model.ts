import { UserInterface } from './user.model';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: UserInterface;
  result: boolean;
  message: string;
}
