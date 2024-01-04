import { Middleware, NextFunction } from 'grammy';
import { IBotContext } from '../bot.types.js';

export function filterAdmins<C extends IBotContext>(): Middleware<C> {
  return async (ctx, next: NextFunction) => {
    if (ctx.user?.isAdmin) {
      await next();
    } else {
      await ctx.reply(`Sorry you don't have a right for this operation.`);
    }
  };
}
