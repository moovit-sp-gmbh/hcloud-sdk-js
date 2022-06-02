import hcloud from '../../src/lib/hcloud';
import { expect } from 'chai';

test('Test hcloud', () => {
  const h = new hcloud({ api: 'test' });
  expect(h.IDP.authenticate()).to.equal('test');
});
