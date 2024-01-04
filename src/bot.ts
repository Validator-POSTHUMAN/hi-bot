import { Bot } from 'grammy';
import { IBotContext } from './bot.types.js';
import configService from './config/config.service.js';
import { filterAdmins } from './middleware/filter-admins.js';
import { initContext } from './middleware/init-context.js';
import { cbCopyToGroup } from './modules/cb-copy-to-group.js';
import { errorHandler } from './modules/error-handler.js';
import { onGroupStatusChanged } from './modules/group/middleware/on-group-status-changed.js';
import { onGetMessage } from './modules/on-get-message.js';
import { onHelp } from './modules/on-help.js';
import { onNotResolved } from './modules/on-not-resolved.js';
import { onStart } from './modules/on-start.js';
import { onGetUsers } from './modules/user/middleware/on-get-users.js';
import { onKickAdmin } from './modules/user/middleware/on-kick-admin.js';
import { onSetAdmin } from './modules/user/middleware/on-set-admin.js';

export const bot = new Bot<IBotContext>(configService.getParam('TELEGRAM_TOKEN'));

export const setupBot = () => {
  bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Help the bot' },
  ]);

  bot.use(initContext());

  const pm = bot.chatType('private');
  const notPm = bot.chatType(['group', 'supergroup', 'channel']);

  onStart(pm);

  pm.use(filterAdmins());

  onGroupStatusChanged(notPm);

  onGetUsers(pm);

  onSetAdmin(pm);
  onKickAdmin(pm);

  onHelp(pm);

  onGetMessage(pm);
  cbCopyToGroup(pm);

  onNotResolved(pm);

  bot.catch(errorHandler);

  return bot;
};
