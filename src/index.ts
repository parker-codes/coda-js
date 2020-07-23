import API from './API';
import { Doc, Table, Row, Column, Page, Control } from './models/index';
import { formatRows } from './models/utilities';
export * from './errors';

export class Coda {
  API: API;

  constructor(token: string) {
    this.API = new API(token);
  }

  /**
   * Returns information about the user.
   *
   * @return object
   */
  async whoAmI(): Promise<any> {
    const { data } = await this.API.request('/whoami');
    return data;
  }

  /**
   * Returns an array of docs.
   *
   * @param array $params Optional query parameters listed here https://coda.io/developers/apis/v1beta1#operation/listDocs
   * @return array
   */
  async listDocs(params: any = {}): Promise<Doc[]> {
    const { data } = await this.API.request('/docs', params);
    return data.items.map((doc) => new Doc(this.API, doc)); // map all items into docs
  }

  async getDoc(id: string): Promise<Doc> {
    const { data } = await this.API.request(`/docs/${id}`);
    return new Doc(this.API, data);
  }

  async listPages(docId: string, params: any): Promise<Page[]> {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listPages
    const { data } = await this.API.request(`/docs/${docId}/Pages`, params);
    return data.items.map((Page) => new Page({ ...Page, docId })); // map all items into Pages
  }

  async getPage(docId: string, PageIdOrName: string): Promise<Page> {
    // https://coda.io/developers/apis/v1beta1#operation/getPage
    const { data } = await this.API.request(
      `/docs/${docId}/Pages/${PageIdOrName}`
    );
    return new Page({ ...data, docId });
  }

  async listTables(docId: string): Promise<Table[]> {
    // https://coda.io/developers/apis/v1beta1#operation/listTables
    const { data } = await this.API.request(`/docs/${docId}/tables`);
    return data.items.map((table) => new Table(this.API, { ...table, docId })); // map all items into tables
  }

  async getTable(docId: string, tableIdOrName: string): Promise<Table> {
    // https://coda.io/developers/apis/v1beta1#operation/getTable
    const { data } = await this.API.request(
      `/docs/${docId}/tables/${tableIdOrName}`
    );
    return new Table(this.API, { ...data, docId });
  }

  async listColumns(
    docId: string,
    tableId: string,
    params: any
  ): Promise<Column[]> {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listColumns
    const { data } = await this.API.request(
      `/docs/${docId}/tables/${tableId}/columns`,
      params
    );
    return data.items.map(
      (column) => new Column({ ...column, docId, tableId })
    ); // map all items into Columns
  }

  async getColumn(
    docId: string,
    tableId: string,
    columnIdOrName: string
  ): Promise<Column> {
    // https://coda.io/developers/apis/v1beta1#operation/getColumn
    const { data } = await this.API.request(
      `/docs/${docId}/tables/${tableId}/columns/${columnIdOrName}`
    );
    return new Column({ ...data, docId, tableId });
  }

  async listRows(docId: string, tableId: string, params: any): Promise<Row[]> {
    // params: query, useColumnNames, limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listRows
    const { data } = await this.API.request(
      `/docs/${docId}/tables/${tableId}/rows`,
      params
    );
    return data.items.map(
      (row) => new Row(this.API, { ...row, docId, tableId })
    ); // map all items into Rows
  }

  async getRow(
    docId: string,
    tableId: string,
    rowIdOrName: string,
    params: any
  ): Promise<Row> {
    // params: useColumnNames
    // https://coda.io/developers/apis/v1beta1#operation/getColumn
    const { data } = await this.API.request(
      `/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`,
      params
    );
    return new Row(this.API, { ...data, docId, tableId });
  }

  // upserts rows
  async insertRows(
    docId: string,
    tableId: string,
    rows: any[] = [],
    keyColumns: any[] = []
  ): Promise<boolean> {
    // params: rows (array - required), keyColumns (array)
    // https://coda.io/developers/apis/v1beta1#operation/upsertRows

    const formattedRows = formatRows(rows);
    const params = { rows: formattedRows, keyColumns };

    const { status } = await this.API.request(
      `/docs/${docId}/tables/${tableId}/rows`,
      params,
      'POST'
    );
    return status === 202;
  }

  async updateRow(
    docId: string,
    tableId: string,
    rowIdOrName: string,
    row: any
  ): Promise<boolean> {
    // params: row (array - required)
    // https://coda.io/developers/apis/v1beta1#operation/updateRow

    const [formattedRow] = formatRows([row]);
    const params = { row: formattedRow };

    const { status } = await this.API.request(
      `/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`,
      params,
      'PUT'
    );
    return status === 202;
  }

  async deleteRow(
    docId: string,
    tableId: string,
    rowIdOrName: string
  ): Promise<boolean> {
    // https://coda.io/developers/apis/v1beta1#operation/deleteRow

    const { status } = await this.API.request(
      `/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`,
      {},
      'DELETE'
    );
    return status === 202;
  }

  async deleteRows(
    docId: string,
    tableId: string,
    rowIds: string[]
  ): Promise<boolean> {
    // https://coda.io/developers/apis/v1beta1#operation/deleteRows

    const params = { rowIds };
    const { status } = await this.API.deleteWithBody(
      `/docs/${docId}/tables/${tableId}/rows`,
      params
    );
    return status === 202;
  }

  async listControls(docId: string, params: any): Promise<Page[]> {
    // params: limit, pageToken, sortBy
    // https://coda.io/developers/apis/v1beta1#operation/listControls
    const { data } = await this.API.request(`/docs/${docId}/controls`, params);
    return data.items.map((control) => new Control({ ...control, docId })); // map all items into Pages
  }

  async getControl(docId: string, controlIdOrName: string): Promise<Page> {
    // https://coda.io/developers/apis/v1beta1#operation/getControl
    const { data } = await this.API.request(
      `/docs/${docId}/controls/${controlIdOrName}`
    );
    return new Control({ ...data, docId });
  }
}
