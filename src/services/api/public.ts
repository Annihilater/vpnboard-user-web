// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Get site config Get site config POST /public/config/get_site_config */
export async function postPublicConfigGetSiteConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetSiteConfigResponse }>(
    '/public/config/get_site_config',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** Check username Check username POST /public/user/check */
export async function postPublicUserCheck(
  body: API.CheckUserNameRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.CheckUserNameResponse }>('/public/user/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create user Create user POST /public/user/create */
export async function postPublicUserCreate(
  body: API.CreateUserRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/public/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Login Login POST /public/user/login */
export async function postPublicUserLogin(
  body: API.LoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.LoginResponse }>('/public/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
