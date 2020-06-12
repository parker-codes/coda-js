import { Table, Section, Folder, Control } from './index';
import API from '../API';
declare class Doc {
    API: API;
    id?: string;
    constructor(API: API, data: any);
    listSections(params: any): Promise<Section[]>;
    getSection(sectionIdOrName: string): Promise<Section>;
    listFolders(params: any): Promise<Folder[]>;
    getFolder(folderIdOrName: string): Promise<Folder>;
    listTables(): Promise<Table[]>;
    getTable(tableIdOrName: string): Promise<Table>;
    listControls(params: any): Promise<Control[]>;
    getControl(controlIdOrName: string): Promise<Control>;
}
export default Doc;
