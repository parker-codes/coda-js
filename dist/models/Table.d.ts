import Column from './Column';
import Row from './Row';
import API from '../API';
declare class Table {
    API: API;
    id?: string;
    docId?: string;
    constructor(API: API, data: any);
    listColumns(params: any): Promise<Column[]>;
    getColumn(columnIdOrName: string): Promise<Column>;
    listRows(params: any): Promise<Row[]>;
    getRow(rowIdOrName: string, params: any): Promise<Row>;
    insertRows(rows?: any[], keyColumns?: any[]): Promise<boolean>;
    updateRow(rowIdOrName: string, row: any): Promise<boolean>;
    deleteRow(rowIdOrName: string): Promise<boolean>;
}
export default Table;
