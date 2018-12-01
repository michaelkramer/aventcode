// @flow

/**
 * The context middleware will pass anything in `res.locals` to the controller and to the view
 */

import path from 'path';

export function contextMiddleware(req: any, res: any, next: Function) {
  res.locals.basedir = path.join(__dirname, '../views');
  res.locals.context = {
    NODE_ENV: process.env.NODE_ENV,
  };
  next();
}
