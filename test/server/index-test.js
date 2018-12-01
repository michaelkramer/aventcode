// @flow
import {test} from 'test/helpers';

import {nameIsJason} from 'server/ctx/users';

test('Name is Jason', (t) => {
  return t.is(nameIsJason('Jason'), true);
});
