import axios, { AxiosRequestConfig, Method } from 'axios';

class API {
  private _axiosInstance: any;

  constructor(token: string) {
    this._axiosInstance = axios.create({
      baseURL: 'https://coda.io/apis/v1beta1',
      headers: {'Authorization': `Bearer ${token}`}
    });
  }

  async request(url: string, params: any = {}, method: Method = 'GET'): Promise<any> {
    try {
      const options: AxiosRequestConfig = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) ? { url, method, data: params } : { url, method, params };

      return await this._axiosInstance(options);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteWithBody(url: string, params: any = {}): Promise<any> {
    try {
      const options: AxiosRequestConfig = { url, method: 'DELETE', data: params };
      return await this._axiosInstance(options);
    } catch (error) {
      console.error(error);
    }
  }
}

export default API;
