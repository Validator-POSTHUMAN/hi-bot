export interface IUser {
  chatId: number;
  username: string;
  isAdmin: boolean;
}

export interface IUserService {
  add: (user: IUser) => Promise<IUser>;
  find: () => Promise<IUser[]>;
}
