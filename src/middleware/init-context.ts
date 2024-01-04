import { Middleware, NextFunction } from 'grammy';
import { IBotContext } from '../bot.types.js';
import userService from '../modules/user/user.service.js';
import parseCallbackParams from '../utils/parse-callback-params.js';

export function initContext<C extends IBotContext>(): Middleware<C> {
  return async (ctx, next: NextFunction) => {
    console.log('initContext: ', ctx);
    ctx.cqParams = ctx.callbackQuery?.data ? parseCallbackParams(ctx.callbackQuery.data) : {};
    ctx.user = ctx.chat?.id ? await userService.findOne(ctx.chat?.id) : null;
    await next();
  };
}
