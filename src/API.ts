import axios, { AxiosRequestConfig, AxiosError, Method } from 'axios';
import * as Errors from './errors';

class API {
  private _axiosInstance: any;

  constructor(token: string) {
    this._axiosInstance = axios.create({
      baseURL: 'https://coda.io/apis/v1',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async request(
    url: string,
    params: any = {},
    method: Method = 'GET'
  ): Promise<any> {
    const options: AxiosRequestConfig = ['POST', 'PUT', 'PATCH'].includes(
      method.toUpperCase()
    )
      ? { url, method, data: params }
      : { url, method, params };
    return await this._axiosInstance(options).catch(determineErrorType);
  }

  async deleteWithBody(url: string, params: any = {}): Promise<any> {
    const options: AxiosRequestConfig = { url, method: 'DELETE', data: params };
    return await this._axiosInstance(options).catch(determineErrorType);
  }
}

function determineErrorType(error: AxiosError) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        throw new Errors.BadRequestError(error.response.statusText);
      case 401:
        throw new Errors.UnauthorizedError(error.response.statusText);
      case 403:
        throw new Errors.ForbiddenError(error.response.statusText);
      case 404:
        throw new Errors.NotFoundError(error.response.statusText);
      case 429:
        throw new Errors.TooManyRequestsError(error.response.statusText);
    }
  }

  throw error; // re-throw
}

export default API;
