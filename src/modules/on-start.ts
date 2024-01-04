import { ChatTypeContext, Composer } from 'grammy';
import { IBotContext } from '../bot.types.js';
import escapeMarkdown from '../utils/escape-markdown.js';
import { sendMessageToUsers } from './user/user.actions.js';
import userService from './user/user.service.js';

export const onStart = (bot: Composer<ChatTypeContext<IBotContext, 'private'>>) => {
  bot.command('start', async (ctx) => {
    const existingUser = await userService.findOne(ctx.chat.id);

    if (existingUser) {
      return ctx.reply(`Welcome back ${existingUser.username}! POSTHUMAN Spiller Bot is ready. Send message here.`);
    } else {
      await sendMessageToUsers(
        `New user joined\n\nID: \`${ctx.chat.id}\`\nUsername: ${
          ctx.chat.username ? '@' + ctx.chat.username : 'unset'
        }\nName: ${escapeMarkdown(ctx.chat.first_name || '')} ${escapeMarkdown(ctx.chat.last_name || '')}`,
        'MarkdownV2',
      );

      await userService.create({
        chatId: ctx.chat.id,
        username: ctx.chat.username || '',
        isAdmin: false,
      });
    }
  });
};
