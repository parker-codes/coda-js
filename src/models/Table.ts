import Column from './Column';
import Row from './Row';
import { formatRows } from './utilities';
import API from '../API';

class Table {
  API: API;
  id?: string;
  docId?: string;

  constructor(API: API, data: any) {
    this.API = API;
    // set properties (docId, id, type, href, browserLink, name, displayColumn (object), rowCount, createdAt, updatedAt, sorts, layout)
    Object.assign(this, data);
  }

  async listColumns(params: any): Promise<Column[]> {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listColumns
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/columns`, params);
    return data.items.map(column => new Column({ ...column, docId: this.docId, tableId: this.id })); // map all items into Columns
  }

  async getColumn(columnIdOrName: string): Promise<Column> {
    // https://coda.io/developers/apis/v1beta1#operation/getColumn
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/columns/${columnIdOrName}`);
    return new Column({ ...data, docId: this.docId, tableId: this.id });
  }

  async listRows(params: any): Promise<Row[]> {
    // params: query, useColumnNames, limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listRows
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`, params);
    return data.items.map(row => new Row(this.API, { ...row, docId: this.docId, tableId: this.id })); // map all items into Rows
  }

  async listRowsPaginatedByToken(params: any): Promise<{ items: Row[]; token: string }> {
    // params: query, useColumnNames, limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listRows
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`, params);
    const items = data.items.map(row => new Row(this.API, { ...row, docId: this.docId, tableId: this.id })); // map all items into Rows
    return { items, token: data.nextPageToken as string };
  }

  async getRow(rowIdOrName: string, params: any): Promise<Row> {
    // params: useColumnNames
    // https://coda.io/developers/apis/v1beta1#operation/getColumn
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, params);
    return new Row(this.API, { ...data, docId: this.docId, tableId: this.id });
  }

  // upserts rows
  async insertRows(rows: any[] = [], keyColumns: any[] = []): Promise<boolean> {
    // params: rows (array - required), keyColumns (array)
    // https://coda.io/developers/apis/v1beta1#operation/upsertRows

    const formattedRows = formatRows(rows);
    const params = { rows: formattedRows, keyColumns };

    const { status } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`, params, 'POST');
    return status === 202;
  }

  async updateRow(rowIdOrName: string, row: any): Promise<boolean> {
    // params: row (array - required)
    // https://coda.io/developers/apis/v1beta1#operation/updateRow

    const [formattedRow] = formatRows([row]);
    const params = { row: formattedRow };

    const { status } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, params, 'PUT');
    return status === 202;
  }

  async deleteRow(rowIdOrName: string): Promise<boolean> {
    // https://coda.io/developers/apis/v1beta1#operation/deleteRow

    const { status } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, {}, 'DELETE');
    return status === 202;
  }

  async deleteRows(rowIds: string[]): Promise<boolean> {
    // https://coda.io/developers/apis/v1beta1#operation/deleteRows

    const params = { rowIds };
    const { status } = await this.API.deleteWithBody(`/docs/${this.docId}/tables/${this.id}/rows`, params);
    return status === 202;
  }
}

export default Table;
