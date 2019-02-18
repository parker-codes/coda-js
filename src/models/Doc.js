
import { Table, Section, Folder } from './index';

class Doc {
    constructor(API, data) {
        this.API = API;
        // set properties (id, type, href, browserLink, name, owner, createdAt, updatedAt)
        Object.assign(this, data);
    }

    async listSections(params) {
        // params: limit, pageToken
        // https://coda.io/developers/apis/v1beta1#operation/listSections
        const { data } = await this.API.request(`/docs/${this.id}/sections`, params);
        return data.items.map(section => new Section({ ...section, docId: this.id })); // map all items into sections
    }

    async getSection(sectionIdOrName) {
        // https://coda.io/developers/apis/v1beta1#operation/getSection
        const { data } = await this.API.request(`/docs/${this.id}/sections/${sectionIdOrName}`);
        return new Section({ ...data, docId: this.id });
    }

    async listFolders(params) {
        // params: limit, pageToken
        // https://coda.io/developers/apis/v1beta1#operation/listFolders
        const { data } = await this.API.request(`/docs/${this.id}/folders`, params);
        return data.items.map(folder => new Folder({ ...folder, docId: this.id })); // map all items into folders
    }

    async getFolder(folderIdOrName) {
        // https://coda.io/developers/apis/v1beta1#operation/getFolder
        const { data } = await this.API.request(`/docs/${this.id}/folders/${folderIdOrName}`);
        return new Folder({ ...data, docId: this.id });
    }

    async listTables() {
        // https://coda.io/developers/apis/v1beta1#operation/listTables
        const { data } = await this.API.request(`/docs/${this.id}/tables`);
        return data.items.map(table => new Table(this.API, { ...table, docId: this.id })); // map all items into tables
    }

    async getTable(tableIdOrName) {
        // https://coda.io/developers/apis/v1beta1#operation/getTable
        const { data } = await this.API.request(`/docs/${this.id}/tables/${tableIdOrName}`);
        return new Table(this.API, { ...data, docId: this.id });
    }
}

export default Doc;
