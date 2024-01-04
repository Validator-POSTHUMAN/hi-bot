import { ChatTypeContext, Composer } from 'grammy';
import { IBotContext } from '../bot.types.js';

export const onNotResolved = (pm: Composer<ChatTypeContext<IBotContext, 'private'>>) => {
  pm.on('callback_query:data', async (ctx) => {
    console.warn('Unknown button event with payload', ctx.callbackQuery.data);
    await ctx.answerCallbackQuery();
  });
};
