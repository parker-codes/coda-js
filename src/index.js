
import API from './API';
import { Doc, Table, Section, Folder } from './models';
import { formatRows } from './models/utilities';

class Coda {

    constructor(token) {
        this.API = new API(token);
    }

    /**
     * Returns information about the user.
     * 
     * @return object 
     */
    async whoAmI() {
        const { data } = await this.API.request('/whoami');
        return data;
    }

    /**
     * Returns an array of docs.
     * 
     * @param array $params Optional query parameters listed here https://coda.io/developers/apis/v1beta1#operation/listDocs
     * @return array 
     */
    async listDocs(params = {})
    {
        const { data } = await this.API.request('/docs', params);
        return data.items.map(doc => new Doc(this.API, doc)); // map all items into docs
    }

    async getDoc(id) {
        const { data } = await this.API.request(`/docs/${id}`);
        return new Doc(this.API, data);
    }

    async listSections(docId, params) {
        // params: limit, pageToken
        // https://coda.io/developers/apis/v1beta1#operation/listSections
        const { data } = await this.API.request(`/docs/${docId}/sections`, params);
        return data.items.map(section => new Section({ ...section, docId })); // map all items into sections
    }

    async getSection(docId, sectionIdOrName) {
        // https://coda.io/developers/apis/v1beta1#operation/getSection
        const { data } = await this.API.request(`/docs/${docId}/sections/${sectionIdOrName}`);
        return new Section({ ...data, docId });
    }

    async listFolders(docId, params) {
        // params: limit, pageToken
        // https://coda.io/developers/apis/v1beta1#operation/listFolders
        const { data } = await this.API.request(`/docs/${docId}/folders`, params);
        return data.items.map(folder => new Folder({ ...folder, docId })); // map all items into folders
    }

    async getFolder(docId, folderIdOrName) {
        // https://coda.io/developers/apis/v1beta1#operation/getFolder
        const { data } = await this.API.request(`/docs/${docId}/folders/${folderIdOrName}`);
        return new Folder({ ...data, docId });
    }

    async listTables(docId) {
        // https://coda.io/developers/apis/v1beta1#operation/listTables
        const { data } = await this.API.request(`/docs/${docId}/tables`);
        return data.items.map(table => new Table(this.API, { ...table, docId })); // map all items into tables
    }

    async getTable(docId, tableIdOrName) {
        // https://coda.io/developers/apis/v1beta1#operation/getTable
        const { data } = await this.API.request(`/docs/${docId}/tables/${tableIdOrName}`);
        return new Table(this.API, { ...data, docId });
    }

// TODO:

    async listColumns(docId, tableId, params) {
        // params: limit, pageToken
        // https://coda.io/developers/apis/v1beta1#operation/listColumns
        const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/columns`, params);
        return data.items.map(column => new Column({ ...column, docId, tableId })); // map all items into Columns
    }

    async getColumn(docId, tableId, columnIdOrName) {
        // https://coda.io/developers/apis/v1beta1#operation/getColumn
        const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/columns/${columnIdOrName}`);
        return new Column({ ...data, docId, tableId });
    }

    async listRows(docId, tableId, params) {
        // params: query, useColumnNames, limit, pageToken
        // https://coda.io/developers/apis/v1beta1#operation/listRows
        const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows`, params);
        return data.items.map(row => new Row(this.API, { ...row, docId, tableId })); // map all items into Rows
    }

    async getRow(docId, tableId, rowIdOrName, params) {
        // params: useColumnNames
        // https://coda.io/developers/apis/v1beta1#operation/getColumn
        const { data } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`, params);
        return new Row(this.API, { ...data, docId, tableId });
    }

    // upserts rows
    async insertRows(docId, tableId, rows = [], keyColumns = []) {
        // params: rows (array - required), keyColumns (array)
        // https://coda.io/developers/apis/v1beta1#operation/upsertRows

        const formattedRows = formatRows(rows);
        const params = { rows: formattedRows, keyColumns };

        const { status } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows`, params, 'POST');
        return status === 202;
    }

    async updateRow(docId, tableId, rowIdOrName, row) {
        // params: row (array - required)
        // https://coda.io/developers/apis/v1beta1#operation/updateRow

        const [formattedRow] = formatRows([row]);
        const params = { row: formattedRow };

        const { status } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`, params, 'PUT');
        return status === 202;
    }

    async deleteRow(docId, tableId, rowIdOrName) {
        // https://coda.io/developers/apis/v1beta1#operation/deleteRow

        const { status } = await this.API.request(`/docs/${docId}/tables/${tableId}/rows/${rowIdOrName}`, {}, 'DELETE');
        return status === 202;
    }
}

const printMsg = () => {
    console.log('Thanks for installing CodaJS!');
};

export { printMsg };

export default Coda;
