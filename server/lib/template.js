// @flow

/**
 * This file is used to load a pug template outside of an Express Webserver rendering a view.
 * Use cases: Sending an email from a Pug Template, running a unit test against a pug template, etc.
 */

import pug from 'pug';
import path from 'path';

const defaultOpts = {basedir: path.join(__dirname, '..', '/web/views')};
const pathToTemplates = 'server/web/views';

const compiledPugs = {};

export function renderPug(templatePath: string, pageVars: Object = {}) {
  let html;
  if (typeof compiledPugs[templatePath] === 'function') {
    html = compiledPugs[templatePath](pageVars);
  } else {
    compiledPugs[templatePath] = compilePug(templatePath);
    html = compiledPugs[templatePath](pageVars);
  }
  return html;
}

/**
 * [compilePug - compile a single Pug file]
 */
export function compilePug(templatePath: string) {
  return pug.compileFile(`${pathToTemplates}${templatePath[0] === '/' ? '' : '/'}${templatePath}${templatePath.indexOf('.pug') === -1 ? '.pug' : ''}`, defaultOpts);
}
