import Coda, { UnauthorizedError, NotFoundError } from '../index';

const TOKEN = process.env.CODA_API_TOKEN as string;

let coda;

beforeAll(() => {
  coda = new Coda(TOKEN);
});

test('does not have access to view docs', async () => {
  try {
    await coda.listDocs();
  } catch (error) {
    expect(error).toBeInstanceOf(UnauthorizedError);
  }
});

test('without using a token', async () => {
  const errorsCoda = new Coda('');

  try {
    await errorsCoda.whoAmI();
  } catch (error) {
    expect(error).toBeInstanceOf(UnauthorizedError);
  }
});

test('fails to find a doc with a bad ID', async () => {
  try {
    const BAD_DOC_ID = 'd-ckjd1013kkk';
    await coda.listTables(BAD_DOC_ID);
  } catch (error) {
    expect(error).toBeInstanceOf(NotFoundError);
  }
});
