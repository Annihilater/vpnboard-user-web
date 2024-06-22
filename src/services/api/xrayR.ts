// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Get node info Get node info POST /public/xrayr/node/info */
export async function postPublicXrayrNodeInfo(
  body: API.NodeInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.NodeInfoResponse }>('/public/xrayr/node/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get user list Get user list POST /public/xrayr/user/list */
export async function postPublicXrayrUserList(
  body: API.UserListRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.UserListResponse[] }>('/public/xrayr/user/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
