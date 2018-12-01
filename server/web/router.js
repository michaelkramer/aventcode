/* @flow */
import path from 'path';
import glob from 'glob';
import {each, isFunction} from 'lodash';
import {httpServer} from 'distraught';

import {contextMiddleware} from 'server/web/middlewares/context';
import {createSocketConnection} from 'server/lib/socket';

const server = httpServer({
  publicPath: path.join(__dirname, 'public'),
  viewPath: path.join(__dirname, 'views'),
});

createSocketConnection(server);

server.app.use('/', contextMiddleware);

glob('server/web/controllers/**/*.js', (err, files) => {
  each(files, (file) => {
    // this can be removed once everything is converted to exporting routes
    // $FlowIgnore
    const controller = require(file); // eslint-disable-line
    if (isFunction(controller.routes)) {
      controller.routes(server);
    } else {
      console.log('==>', file, 'doesn\'t have a routes export');
    }

    // require(file).routes(server); // eslint-disable-line
  });
});

server.start();
