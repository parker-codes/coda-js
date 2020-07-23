import Table from './Table';
import Section from './Page';
import Control from './Control';
import API from '../API';

class Doc {
  API: API;
  id?: string;

  constructor(API: API, data: any) {
    this.API = API;
    // set properties (id, type, href, browserLink, name, owner, createdAt, updatedAt)
    Object.assign(this, data);
  }

  async listSections(params: any): Promise<Section[]> {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listSections
    const { data } = await this.API.request(
      `/docs/${this.id}/sections`,
      params
    );
    return data.items.map(
      (section) => new Section({ ...section, docId: this.id })
    ); // map all items into sections
  }

  async getSection(sectionIdOrName: string): Promise<Section> {
    // https://coda.io/developers/apis/v1beta1#operation/getSection
    const { data } = await this.API.request(
      `/docs/${this.id}/sections/${sectionIdOrName}`
    );
    return new Section({ ...data, docId: this.id });
  }

  async listTables(): Promise<Table[]> {
    // https://coda.io/developers/apis/v1beta1#operation/listTables
    const { data } = await this.API.request(`/docs/${this.id}/tables`);
    return data.items.map(
      (table) => new Table(this.API, { ...table, docId: this.id })
    ); // map all items into tables
  }

  async getTable(tableIdOrName: string): Promise<Table> {
    // https://coda.io/developers/apis/v1beta1#operation/getTable
    const { data } = await this.API.request(
      `/docs/${this.id}/tables/${tableIdOrName}`
    );
    return new Table(this.API, { ...data, docId: this.id });
  }

  async listControls(params: any): Promise<Control[]> {
    // https://coda.io/developers/apis/v1beta1#operation/listControls
    const { data } = await this.API.request(
      `/docs/${this.id}/controls`,
      params
    );
    return data.items.map(
      (control) => new Control({ ...control, docId: this.id })
    ); // map all items into controls
  }

  async getControl(controlIdOrName: string): Promise<Control> {
    // https://coda.io/developers/apis/v1beta1#operation/getControl
    const { data } = await this.API.request(
      `/docs/${this.id}/controls/${controlIdOrName}`
    );
    return new Control({ ...data, docId: this.id });
  }
}

export default Doc;
