import { bot } from '../../bot.js';
import groupService from './group.service.js';

export const copyMessageToGroup = async (srcGroupId: number, dstGroupId: number, messageId: number) => {
  const group = await groupService.findOne(dstGroupId);
  if (!group) {
    return false;
  }

  await bot.api.copyMessage(group.chatId, srcGroupId, messageId);
};
