// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Create a new order Create a new order POST /user/order/create */
export async function postUserOrderCreate(
  body: API.CreateOrderRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.CreateOrderResponse }>('/user/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** List orders List orders POST /user/order/list */
export async function postUserOrderList(
  body: API.ListOrderRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.ListOrderResponse }>('/user/order/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create a new payment Create a new payment POST /user/payment/create */
export async function postUserPaymentCreate(
  body: API.CreatePaymentRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.CreatePaymentResponse }>('/user/payment/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** List product List product POST /user/product/list */
export async function postUserProductList(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.ListProductResponse }>('/user/product/list', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get user info Get user info POST /user/user/info */
export async function postUserUserInfo(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetUserInfoResponse }>('/user/user/info', {
    method: 'POST',
    ...(options || {}),
  });
}
