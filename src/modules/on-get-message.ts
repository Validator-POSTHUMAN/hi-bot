import { ChatTypeContext, Composer } from 'grammy';
import { IBotContext } from '../bot.types.js';
import groupService from './group/group.service.js';

export const onGetMessage = (pm: Composer<ChatTypeContext<IBotContext, 'private'>>) => {
  pm.on('message', async (ctx) => {
    const groups = await groupService.findAll();

    await ctx.reply('Where you want to send the message?', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: groups.map((group) => [
          {
            text: group.name,
            callback_data: `cb-copy-to-group?groupId=${group.chatId}&messageId=${ctx.message.message_id}`,
          },
        ]),
      },
    });
  });
};
