// @flow
import {cronServer, chalk} from 'distraught';

export function startCronServer() {
  cronServer({
    // requiredEnv: REQUIRED_ENV,
    crons: [
      {
        name: 'Test Cron',
        cronTime: '*/5 * * * * *', // (seconds, minutes, hours, day of month, months, day of week), this runs every 5 seconds
        onTick() {
          console.log(chalk.cyan.bold('Cron onTick fired'));
        },
      },
    ],
  });
}
