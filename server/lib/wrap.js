import Raven from 'raven';
import {log, chalk} from 'distraught';

/**
 * [w - wrap function used around Route Handler functions that allows unhandled promise errors to be caught]
 */
export function wrap(genFn: Function) {
  return function handler(req: any, res: any, next: Function) {
    return genFn(req, res)
      .catch((err) => {
        if (process.env.SENTRY_DSN) {
          const ravenPayload = {};
          if (req && req.user && req.user.id) {
            ravenPayload.user = req.user;
          }

          Raven.captureException(err, ravenPayload);
        } else {
          log(chalk.red.bold(err.message), err.stack);
        }

        if (process.env.NODE_ENV === 'production') {
          return res.render('page/errors/internal-server-error');
        }

        return res.status(500).send(`${err.message}<br /><br />${err.stack.split('\n').join('<br />')}`);
      });
  };
}
