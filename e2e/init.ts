import {cleanup, init} from 'detox';
import * as adapter from 'detox/runners/jest/adapter';

beforeAll(async () => {
  // @ts-ignore
  await init({}, {initGlobals: false});
}, 300000);
afterAll(async () => {
  try {
    await adapter.afterAll();
  } catch (err) {}
  await cleanup();
});
