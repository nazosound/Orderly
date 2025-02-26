import { UserInterface } from './user.model';

export interface UserSession {
  user: UserInterface;
  jwt: string;
}
