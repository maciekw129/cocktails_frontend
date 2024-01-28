export interface UserData {
  login: string;
  email: string;
  firstName: string;
  lastName: string;
}

export type PatchUserDto = Omit<UserData, 'login' | 'email'>;
