import Coda from '../index';

const TOKEN = process.env.CODA_API_TOKEN as string;
let coda;

beforeAll(() => {
  coda = new Coda(TOKEN);
});

test('can determine token user (whoAmI)', async () => {
  const whoAmI = await coda.whoAmI();
  expect(whoAmI).toMatchObject({
    name: 'Parker McMullin',
    type: 'user',
  });
});
