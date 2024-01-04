import { ChatTypeContext, Composer } from 'grammy';
import { IBotContext } from '../bot.types.js';
import escapeMarkdown from '../utils/escape-markdown.js';
import { copyMessageToGroup } from './group/group.actions.js';
import groupService from './group/group.service.js';

export const cbCopyToGroup = (pm: Composer<ChatTypeContext<IBotContext, 'private'>>) => {
  pm.callbackQuery(/cb-copy-to-group.*/, async (ctx) => {
    const group = await groupService.findOne(+ctx.cqParams.groupId);
    const messageId = +ctx.cqParams.messageId;
    await copyMessageToGroup(ctx.chat.id, group.chatId, messageId);

    await ctx.reply(`Sent to *${escapeMarkdown(group.name)}*`, {
      parse_mode: 'MarkdownV2',
      reply_to_message_id: messageId,
    });
  });
};
