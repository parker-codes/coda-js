
import { formatRows } from './utilities';

class Row {
    constructor(API, data) {
        this.API = API;
        // set properties (docId, tableId, id, type, href, name, index, browserLink, createdAt, updatedAt, values (object))
        Object.assign(this, data);
    }

    // format values as key/value pair array instead of as object
    listValues() {
        const values = [];

        Object.keys(this.values).forEach(column => {
            values.push({ column, value: this.values[column] });
        });

        return values;
    }

    async update(row) {
        // params: row (array - required)
        // https://coda.io/developers/apis/v1beta1#operation/updateRow

        const [formattedRow] = formatRows([row]);
        const params = { row: formattedRow };

        const { status } = await this.API.request(`/docs/${this.docId}/tables/${this.tableId}/rows/${this.id}`, params, 'PUT');
        return status === 202;
    }

    async delete() {
        // https://coda.io/developers/apis/v1beta1#operation/deleteRow

        const { status } = await this.API.request(`/docs/${this.docId}/tables/${this.tableId}/rows/${this.id}`, {}, 'DELETE');
        return status === 202;
    }
}

export default Row;
