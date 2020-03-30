import { Method } from 'axios';
declare class API {
    constructor(token: string);
    request(url: string, params?: any, method?: Method): Promise<any>;
    deleteWithBody(url: string, params?: any): Promise<any>;
}
export default API;
