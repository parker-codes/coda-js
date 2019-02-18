
import axios from 'axios';

class API {

    constructor(token) {
        // set up axios defaults
        axios.defaults.baseURL = 'https://coda.io/apis/v1beta1';
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async request(url, params = {}, method = 'GET') {
        try {
            return await axios({ method, url, data: params, params });
        } catch (error) {
            console.error(error);
        }
    }
}

export default API;
