import { ChatTypeContext, Composer } from 'grammy';
import { IBotContext } from '../../../bot.types.js';
import { formatUser } from '../../../utils/format-user.js';
import { sendMessageToUsers } from '../user.actions.js';
import userService from '../user.service.js';

export const onSetAdmin = (pm: Composer<ChatTypeContext<IBotContext, 'private'>>) => {
  pm.command('setadmin', async (ctx) => {
    const [_, userIdText] = ctx.update.message?.text?.split(' ');
    const userId = parseInt(userIdText);

    if (!userId) {
      return ctx.reply(`Please provide userId.`);
    }

    const user = await userService.findOne(userId);

    if (!user) {
      return ctx.reply(`User for #${userId} not found`);
    }

    await userService.update(userId, { isAdmin: true });

    await sendMessageToUsers(`Admin right granted\n\nto ${formatUser(user)}\nby ${formatUser(ctx.user)}`, 'MarkdownV2');
  });
};
