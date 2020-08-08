import { formatRows } from './utilities';
import API from '../API';
import PendingRequest from './PendingRequest';

class Row {
  API: API;
  id?: string;
  docId?: string;
  tableId?: string;
  values?: any;

  constructor(API: API, data: any) {
    this.API = API;
    // set properties (docId, tableId, id, type, href, name, index, browserLink, createdAt, updatedAt, values (object))
    Object.assign(this, data);
  }

  // format values as key/value pair array instead of as object
  listValues(): any[] {
    const values: any[] = [];

    Object.keys(this.values).forEach((column) => {
      values.push({ column, value: this.values[column] });
    });

    return values;
  }

  // params: row (array - required)
  // https://coda.io/developers/apis/v1#operation/updateRow
  async update(row: any): Promise<PendingRequest> {
    const [formattedRow] = formatRows([row]);
    const params = { row: formattedRow };

    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.tableId}/rows/${this.id}`, params, 'PUT');
    return new PendingRequest(this.API, data.requestId);
  }

  // https://coda.io/developers/apis/v1#operation/deleteRow
  async delete(): Promise<PendingRequest> {
    const { data } = await this.API.request(`/docs/${this.docId}/tables/${this.tableId}/rows/${this.id}`, {}, 'DELETE');
    return new PendingRequest(this.API, data.requestId);
  }
}

export default Row;
