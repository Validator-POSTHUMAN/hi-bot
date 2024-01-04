import { ChatTypeContext, Composer } from 'grammy';
import { bot } from '../../../bot.js';
import { IBotContext } from '../../../bot.types.js';
import { formatUser } from '../../../utils/format-user.js';
import userService from '../user.service.js';

export const onGetUsers = (pm: Composer<ChatTypeContext<IBotContext, 'private'>>) => {
  pm.command('getusers', async (ctx) => {
    const users = await userService.findAll();
    await bot.api.sendMessage(ctx.chat.id, `Users:\n\n${users.map((u) => `${formatUser(u, true)}`).join('\n')}`, {
      parse_mode: 'MarkdownV2',
    });
  });
};
