import { setupBot } from './bot.js';

(async () => {
  const bot = setupBot();
  await bot.start({
    onStart: (botInfo) => {
      console.log(`${botInfo.first_name} is started `);
    },
  });
})();
