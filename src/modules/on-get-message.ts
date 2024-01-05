import { ChatTypeContext, Composer } from 'grammy';
import { IBotContext } from '../bot.types.js';
import groupService from './group/group.service.js';

export const onGetMessage = (pm: Composer<ChatTypeContext<IBotContext, 'private'>>) => {
  pm.on('message', async (ctx): Promise<void> => {
    const groups = await groupService.findAll();

    if (groups.length > 0) {
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
    } else {
      await ctx.reply('Firstly you need to add bot to groups and channels', { parse_mode: 'MarkdownV2' });
    }
  });
};
