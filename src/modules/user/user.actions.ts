import { bot } from '../../bot.js';
import userService from './user.service.js';

export const sendMessageToUsers = async (message: string, parseMode: 'HTML' | 'MarkdownV2' = 'HTML') => {
  const users = await userService.findAdmins();
  for (let user of users) {
    await bot.api.sendMessage(user.chatId, message, { parse_mode: parseMode });
  }
};
