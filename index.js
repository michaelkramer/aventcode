#!/usr/bin/env node
/* @flow */
/* eslint-disable strict */

"use strict";

require("babel-register");

const program = require("commander");

const startWebServer = require("./web").startWebServer;

const start201801 = require("./scripts/2018-01").run;
const start201802 = require("./scripts/2018-02").run;

program
  .command("web")
  .description("start a web server")
  .action(startWebServer);

program
  .command("2018-01")
  .description("start 2018-01")
  .action(start201801);
program
  .command("2018-02")
  .description("start 2018-02")
  .action(start201802);

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(1);
}
