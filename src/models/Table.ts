import Column from './Column';
import Row from './Row';
import { formatRows } from './utilities';
import API from '../API';
import PendingRequest from './PendingRequest';

class Table {
  API: API;
  id?: string;
  docId?: string;
  name?: string;

  constructor(API: API, data: any) {
    this.API = API;
    // set properties (docId, id, type, href, browserLink, name, parent(object),parentTable(object),displayColumn (object), rowCount, createdAt, updatedAt, sorts, layout)
    Object.assign(this, data);
  }

  // params: limit, pageToken
  // https://coda.io/developers/apis/v1#operation/listColumns
  async listColumns(params: any): Promise<Column[]> {
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/columns`, params);
    return data.items.map((column) => new Column({ ...column, docId: this.docId, tableId: this.id })); // map all items into Columns
  }

  // https://coda.io/developers/apis/v1#operation/getColumn
  async getColumn(columnIdOrName: string): Promise<Column> {
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/columns/${columnIdOrName}`);
    return new Column({ ...data, docId: this.docId, tableId: this.id });
  }

  // params: query, useColumnNames, limit, pageToken
  // https://coda.io/developers/apis/v1#operation/listRows
  async listRows(params: any): Promise<Row[]> {
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`, params);
    return data.items.map((row) => new Row(this.API, { ...row, docId: this.docId, tableId: this.id })); // map all items into Rows
  }

  // params: query, useColumnNames, limit, pageToken
  // https://coda.io/developers/apis/v1#operation/listRows
  async listRowsPaginatedByToken(params: any): Promise<{ items: Row[]; token: string }> {
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`, params);
    const items = data.items.map((row) => new Row(this.API, { ...row, docId: this.docId, tableId: this.id })); // map all items into Rows
    return { items, token: data.nextPageToken as string };
  }

  // params: useColumnNames
  // https://coda.io/developers/apis/v1#operation/getColumn
  async getRow(rowIdOrName: string, params: any): Promise<Row> {
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, params);
    return new Row(this.API, { ...data, docId: this.docId, tableId: this.id });
  }

  // upserts rows
  // params: rows (array - required), keyColumns (array)
  // https://coda.io/developers/apis/v1#operation/upsertRows
  async insertRows(rows: any[] = [], keyColumns: any[] = []): Promise<PendingRequest> {
    const formattedRows = formatRows(rows);
    const params = { rows: formattedRows, keyColumns };

    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`, params, 'POST');
    return new PendingRequest(this.API, data.requestId, data.addedRowIds);
  }

  // params: row (array - required)
  // https://coda.io/developers/apis/v1#operation/updateRow
  async updateRow(rowIdOrName: string, row: any): Promise<PendingRequest> {
    const [formattedRow] = formatRows([row]);
    const params = { row: formattedRow };

    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, params, 'PUT');
    return new PendingRequest(this.API, data.requestId);
  }

  // https://coda.io/developers/apis/v1#operation/deleteRow
  async deleteRow(rowIdOrName: string): Promise<PendingRequest> {
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, {}, 'DELETE');
    return new PendingRequest(this.API, data.requestId);
  }

  // https://coda.io/developers/apis/v1#operation/deleteRows
  async deleteRows(rowIds: string[]): Promise<PendingRequest> {
    const params = { rowIds };
    const { data } = await this.API.deleteWithBody(`/docs/${this.docId}/tables/${this.id}/rows`, params);
    return new PendingRequest(this.API, data.requestId);
  }
}

export default Table;
