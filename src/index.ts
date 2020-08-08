import API from './API';
import { Doc, Table, Row, Column, Page, Control, PendingRequest } from './models/index';
import { formatRows } from './models/utilities';
export * from './errors';

export class Coda {
  API: API;

  constructor(token: string) {
    this.API = new API(token);
  }

  // returns information about the user
  async whoAmI(): Promise<any> {
    const { data } = await this.API.request('/whoami');
    return data;
  }

  // gets an array of docs
  // https://coda.io/developers/apis/v1#operation/listDocs
  async listDocs(params: any = {}): Promise<Doc[]> {
    const { data } = await this.API.request('/docs', params);
    return data.items.map((doc) => new Doc(this.API, doc)); // map all items into docs
  }

  async getDoc(id: string): Promise<Doc> {
    const { data } = await this.API.request(`/docs/${id}`);
    return new Doc(this.API, data);
  }

  // params: limit, pageToken
  // https://coda.io/developers/apis/v1#operation/listPages
  async listPages(docId: string, params: any): Promise<Page[]> {
    const { data } = await this.API.request(`/docs/${docId}/Pages`, params);
    return data.items.map((Page) => new Page({ ...Page, docId })); // map all items into Pages
  }

  // https://coda.io/developers/apis/v1#operation/getPage
  async getPage(docId: string, pageIdOrName: string): Promise<Page> {
    const { data } = await this.API.request(`/docs/${docId}/Pages/${pageIdOrName}`);
    return new Page({ ...data, docId });
  }

  // https://coda.io/developers/apis/v1#operation/listTables
  async listTables(docId: string): Promise<Table[]> {
    const { data } = await this.API.request(`/docs/${docId}/tables`);
    return data.items.map((table) => new Table(this.API, { ...table, docId })); // map all items into tables
  }

  // https://coda.io/developers/apis/v1#operation/getTable
  async getTable(docId: string, tableIdOrName: string): Promise<Table> {
    const { data } = await this.API.request(`/docs/${docId}/tables/${tableIdOrName}`);
    return new Table(this.API, { ...data, docId });
  }

  // params: limit, pageToken
  // https://coda.io/developers/apis/v1#operation/listColumns
  async listColumns(docId: string, tableId: string, params: any): Promise<Column[]> {
    const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/columns`, params);
    return data.items.map((column) => new Column({ ...column, docId, tableId })); // map all items into Columns
  }

  // https://coda.io/developers/apis/v1#operation/getColumn
  async getColumn(docId: string, tableId: string, columnIdOrName: string): Promise<Column> {
    const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/columns/${columnIdOrName}`);
    return new Column({ ...data, docId, tableId });
  }

  // params: query, useColumnNames, limit, pageToken
  // https://coda.io/developers/apis/v1#operation/listRows
  async listRows(docId: string, tableId: string, params: any): Promise<Row[]> {
    const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows`, params);
    return data.items.map((row) => new Row(this.API, { ...row, docId, tableId })); // map all items into Rows
  }

  // params: useColumnNames
  // https://coda.io/developers/apis/v1#operation/getColumn
  async getRow(docId: string, tableId: string, rowIdOrName: string, params: any): Promise<Row> {
    const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`, params);
    return new Row(this.API, { ...data, docId, tableId });
  }

  // upserts rows
  // params: rows (array - required), keyColumns (array)
  // https://coda.io/developers/apis/v1#operation/upsertRows
  async insertRows(docId: string, tableId: string, rows: any[] = [], keyColumns: any[] = []): Promise<PendingRequest> {
    const formattedRows = formatRows(rows);
    const params = { rows: formattedRows, keyColumns };

    const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows`, params, 'POST');
    return new PendingRequest(this.API, data.requestId);
  }

  // params: row (array - required)
  // https://coda.io/developers/apis/v1#operation/updateRow
  async updateRow(docId: string, tableId: string, rowIdOrName: string, row: any): Promise<PendingRequest> {
    const [formattedRow] = formatRows([row]);
    const params = { row: formattedRow };

    const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`, params, 'PUT');
    return new PendingRequest(this.API, data.requestId);
  }

  // https://coda.io/developers/apis/v1#operation/deleteRow
  async deleteRow(docId: string, tableId: string, rowIdOrName: string): Promise<PendingRequest> {
    const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`, {}, 'DELETE');
    return new PendingRequest(this.API, data.requestId);
  }

  // https://coda.io/developers/apis/v1#operation/deleteRows
  async deleteRows(docId: string, tableId: string, rowIds: string[]): Promise<PendingRequest> {
    const params = { rowIds };
    const { data } = await this.API.deleteWithBody(`/docs/${docId}/tables/${tableId}/rows`, params);
    return new PendingRequest(this.API, data.requestId);
  }

  // https://coda.io/developers/apis/v1#operation/getMutationStatus
  async mutationStatus(requestId: string): Promise<boolean> {
    const { data } = await this.API.request(`/mutationStatus/${requestId}`);
    return data.completed;
  }

  // params: limit, pageToken, sortBy
  // https://coda.io/developers/apis/v1#operation/listControls
  async listControls(docId: string, params: any): Promise<Page[]> {
    const { data } = await this.API.request(`/docs/${docId}/controls`, params);
    return data.items.map((control) => new Control({ ...control, docId })); // map all items into Pages
  }

  // https://coda.io/developers/apis/v1#operation/getControl
  async getControl(docId: string, controlIdOrName: string): Promise<Page> {
    const { data } = await this.API.request(`/docs/${docId}/controls/${controlIdOrName}`);
    return new Control({ ...data, docId });
  }
}
