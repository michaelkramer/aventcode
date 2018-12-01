#!/usr/bin/env node
/* @flow */
/* eslint-disable strict */

'use strict';

require('babel-register');

const program = require('commander');

const {addDBConnection, addHeretic, addCache} = require('distraught');

const startWebServer = require('./web').startWebServer;
const startWorkerServer = require('./workers').startWorkerServer;
const startCronServer = require('./crons').startCronServer;

addCache('ck', {connection: process.env.REDIS_URL}); // makes cache.ck available if you `import {cache} from 'distraught';`

const dbConnection = addDBConnection('ck', {connection: process.env.DATABASE_URL}); // makes db.ck available if you `import {db} from 'distraught';`
addHeretic('ck', {dbConnection, connection: process.env.AMQP_URL}); // makes heretic.ck available if you `import {heretic} from 'distraught';`

function allServers() {
  startWebServer();
  startWorkerServer();
  startCronServer();
}

program
  .command('web')
  .description('start a web server')
  .action(startWebServer);

program
  .command('workers')
  .description('start a worker server')
  .action(startWorkerServer);

program
  .command('cron')
  .description('start a cron server')
  .action(startCronServer);

program
  .command('all')
  .description('start all servers')
  .action(allServers);

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(1);
}
