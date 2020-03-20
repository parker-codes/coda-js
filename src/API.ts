import axios, { AxiosRequestConfig, Method } from 'axios';

class API {
  constructor(token: string) {
    // set up axios defaults
    axios.defaults.baseURL = 'https://coda.io/apis/v1beta1';
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async request(url: string, params: any = {}, method: Method = 'GET'): Promise<any> {
    try {
      const options: AxiosRequestConfig = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())
        ? { url, method, data: params }
        : { url, method, params };

      return await axios(options);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteWithBody(url: string, params: any = {}): Promise<any> {
    try {
      const options: AxiosRequestConfig = { url, method: 'DELETE', data: params };
      return await axios(options);
    } catch (error) {
      console.error(error);
    }
  }
}

export default API;
