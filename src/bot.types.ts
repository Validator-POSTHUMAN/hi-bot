import { Context } from 'grammy';
import { IUser } from './modules/user/user.types';

export type IBotContext = Context & { cqParams: any; user: IUser | null };
