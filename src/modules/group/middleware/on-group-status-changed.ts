import { ChatTypeContext, Composer } from 'grammy';
import { IBotContext } from '../../../bot.types.js';
import escapeMarkdown from '../../../utils/escape-markdown.js';
import { sendMessageToUsers } from '../../user/user.actions.js';
import groupService from '../group.service.js';

export const onGroupStatusChanged = (
  bot: Composer<ChatTypeContext<IBotContext, 'channel' | 'group' | 'supergroup'>>,
) => {
  bot.on('my_chat_member', async (ctx, next) => {
    switch (ctx.myChatMember.new_chat_member.status) {
      case 'member':
      case 'administrator':
      case 'creator':
        const newGroup = await groupService.create({
          chatId: ctx.chat.id,
          name: ctx.chat.title,
          type: ctx.chat.type,
          order: 0,
        });
        await sendMessageToUsers(
          `${ctx.chat.type.toUpperCase()} *${escapeMarkdown(newGroup.name)}* was added`,
          'MarkdownV2',
        );
        break;
      default:
        await groupService.remove(ctx.chat.id);
        await sendMessageToUsers(
          `${ctx.chat.type.toUpperCase()} *${escapeMarkdown(ctx.chat.title)}* was removed`,
          'MarkdownV2',
        );
    }
  });
};
