import { getTranslation } from '@/i18n';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import i18next from 'i18next';
import { toast } from 'sonner';
import { API_URL } from './constants';
import { getCookie } from './cookies';

const request = axios.create({
  baseURL: API_URL || '/api',
  // withCredentials: true,
  // timeout: 10000,
});

request.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    const Authorization = getCookie('Authorization');
    if (Authorization) request.headers.Authorization = Authorization;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  async (response) => {
    const { t } = await getTranslation(i18next.language, 'common');
    const code = response.data.code;
    if (code !== 0) toast.error(t(`request.error.${code}`));
    return response;
  },
  async (error) => {
    if (!error.config.skipErrorHandler) {
      const { t } = await getTranslation(i18next.language, 'common');
      const code = error.response?.data?.code;
      let message = code && t(`request.error.${code}`);
      if (message) {
        toast.error(message || error.response?.data?.message || error.response?.statusText);
      } else {
        toast.error(t('request.error.default'));
      }
      return Promise.reject(error);
    }
  },
);

export default request;
