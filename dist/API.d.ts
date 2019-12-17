import { Method } from 'axios';
declare class API {
    constructor(token: string);
    request(url: string, params?: any, method?: Method): Promise<any>;
}
export default API;
