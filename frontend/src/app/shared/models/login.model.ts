import { UserInterface } from './user.model';

export interface ApiResponse {
  token: string;
  refreshToken: string;
  user: UserInterface;
  result: boolean;
  message: string;
}
