import API from '../API';
declare class Row {
    API: API;
    id?: string;
    docId?: string;
    tableId?: string;
    values?: any;
    constructor(API: API, data: any);
    listValues(): any[];
    update(row: any): Promise<boolean>;
    delete(): Promise<boolean>;
}
export default Row;
