import { ChatTypeContext, Composer } from 'grammy';
import { bot } from '../bot.js';
import { IBotContext } from '../bot.types.js';

export const onHelp = (pm: Composer<ChatTypeContext<IBotContext, 'private'>>) => {
  pm.command('help', async (ctx) => {
    await bot.api.sendMessage(
      ctx.chat.id,
      `
Commands:
      
/getusers - print list of users
/setadmin [userid] - add admin role to user
/kickadmin [userid] - remove admin role from user
/help - show this help

📌 add bot to group or channel to give him possibility to forward messages.
    
📌 send (or forward) a message here to get a menu with all groups to copy this message`,
    );
  });
};
