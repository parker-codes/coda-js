import Coda from '../index';

const TOKEN = process.env.CODA_API_TOKEN as string;
const DOC_ID = 'O7d8JvXngY';
const TODOS_TABLE_ID = 'grid-_11oAR4XdM';

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

test('can list tables on a doc', async () => {
  const doc = await coda.getDoc(DOC_ID);
  const tables = await doc.listTables();

  expect(tables).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: 'table',
        id: TODOS_TABLE_ID,
      }),
    ])
  );
});

test('can list columns on a table', async () => {
  const columns = await coda.listColumns(DOC_ID, TODOS_TABLE_ID);
  const columnNames = columns.map((column) => column.name);

  expect(columnNames).toEqual(['Name', 'Action', 'Completed']);
});

test('can list rows on a table', async () => {
  const rows = await coda.listRows(DOC_ID, TODOS_TABLE_ID);

  expect(rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: 'row',
        docId: DOC_ID,
        tableId: TODOS_TABLE_ID,
      }),
    ])
  );
});

test('can get row values as object', async () => {
  const rows = await coda.listRows(DOC_ID, TODOS_TABLE_ID, {
    useColumnNames: true,
  });

  const firstRow = rows[0];

  expect(firstRow).toMatchObject({
    type: 'row',
    docId: DOC_ID,
    tableId: TODOS_TABLE_ID,
    values: { Name: 'Markus', Action: 'Play the drums', Completed: false },
  });
});

test('can get row values as { column, value } array', async () => {
  const rows = await coda.listRows(DOC_ID, TODOS_TABLE_ID, {
    useColumnNames: true,
  });

  const firstRow = rows[0];
  const values = firstRow.listValues();

  expect(values).toEqual([
    { column: 'Name', value: 'Markus' },
    { column: 'Action', value: 'Play the drums' },
    { column: 'Completed', value: false },
  ]);
});

test('can get row from table object', async () => {
  const ROW_ID = 'i-OFspzXgH4Q';

  const table = await coda.getTable(DOC_ID, TODOS_TABLE_ID);
  const row = await table.getRow(ROW_ID);

  expect(row).toMatchObject({
    type: 'row',
    docId: DOC_ID,
    tableId: TODOS_TABLE_ID,
    id: ROW_ID,
  });
});
