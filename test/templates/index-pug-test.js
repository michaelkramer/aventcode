// @flow
import {renderPug, test} from 'test/helpers';

test('Index page displays Hello + name passed in from template vars', (t) => {
  const $ = renderPug('page/index', {name: 'Wild Wild World'});
  t.is($('.ref__name').text(), 'Hello Wild Wild World');
});
