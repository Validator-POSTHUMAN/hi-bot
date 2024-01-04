import { IUser } from '../modules/user/user.types';

export const formatUser = (user: IUser | null, showRole = false): string => {
  if (!user) {
    return 'User not found';
  }

  const name = [`\`${user.chatId}\` ${user.username ? `@${user.username}` : 'username unset'}`];

  if (showRole) {
    name.push(`${user.isAdmin ? 'admin' : 'user'}`);
  }

  return name.join(' ');
};
