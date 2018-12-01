// @flow

import {wrap as w} from 'server/lib/wrap'; // Middleware that requires that route returns a Promise, it will catch any uncaught errors and throw a 500 error if

import {fetchUsers} from 'server/ctx/users';

exports.routes = (server: Object) => {
  server.app.get('/', w(async (req: any, res: any) => {
    const name = req.query.name || 'World';

    return res.render('page/index', {
      name,
    });
  }));

  server.app.get('/users', w(async (req: any, res: any) => {
    const users = await fetchUsers();

    return res.render('page/users', {
      users,
    });
  }));
};
