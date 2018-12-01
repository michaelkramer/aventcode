// @flow

import {assign} from 'lodash';
import cheerio from 'cheerio';
import ava from 'ava';
import {addDBConnection} from 'distraught';
import mockKnex from 'mock-knex';

import {renderPug as pugTemplateRender} from 'server/lib/template';

const distraughtDB = require('distraught').db;

addDBConnection('ck', {connection: process.env.DATABASE_URL});
mockKnex.mock(distraughtDB.ck);

const defaultContext = {
  cache: true,
  context: {
    NODE_ENV: process.env.NODE_ENV, // Needed for env checks in many views
  },
};

export function renderPug(templateName: string, originalPageVars: Object) {
  const pageVars = assign({}, defaultContext, originalPageVars);
  const html = pugTemplateRender(templateName, pageVars);
  return cheerio.load(html);
}

export const test = ava;
export const db = mockKnex.getTracker();
