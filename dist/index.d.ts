import API from './API';
import { Doc, Table, Row, Column, Section, Folder } from './models/index';
declare class Coda {
    API: API;
    constructor(token: string);
    /**
     * Returns information about the user.
     *
     * @return object
     */
    whoAmI(): Promise<any>;
    /**
     * Returns an array of docs.
     *
     * @param array $params Optional query parameters listed here https://coda.io/developers/apis/v1beta1#operation/listDocs
     * @return array
     */
    listDocs(params?: any): Promise<Doc[]>;
    getDoc(id: string): Promise<Doc>;
    listSections(docId: string, params: any): Promise<Section[]>;
    getSection(docId: string, sectionIdOrName: string): Promise<Section>;
    listFolders(docId: string, params: any): Promise<Folder[]>;
    getFolder(docId: string, folderIdOrName: string): Promise<Folder>;
    listTables(docId: string): Promise<Table[]>;
    getTable(docId: string, tableIdOrName: string): Promise<Table>;
    listColumns(docId: string, tableId: string, params: any): Promise<Column[]>;
    getColumn(docId: string, tableId: string, columnIdOrName: string): Promise<Column>;
    listRows(docId: string, tableId: string, params: any): Promise<Row[]>;
    getRow(docId: string, tableId: string, rowIdOrName: string, params: any): Promise<Row>;
    insertRows(docId: string, tableId: string, rows?: any[], keyColumns?: any[]): Promise<boolean>;
    updateRow(docId: string, tableId: string, rowIdOrName: string, row: any): Promise<boolean>;
    deleteRow(docId: string, tableId: string, rowIdOrName: string): Promise<boolean>;
    deleteRows(docId: string, tableId: string, rowIds: string[]): Promise<boolean>;
    listControls(docId: string, params: any): Promise<Section[]>;
    getControl(docId: string, controlIdOrName: string): Promise<Section>;
}
export default Coda;
