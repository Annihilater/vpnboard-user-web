// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Get site config Get site config POST /admin/config/get_site_config */
export async function postAdminConfigGetSiteConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetSiteConfigResponse }>(
    '/admin/config/get_site_config',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** Update site config Update site config POST /admin/config/update_site_config */
export async function postAdminConfigUpdateSiteConfig(
  body: API.UpdateSiteConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/config/update_site_config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create a new node group Create a new node group POST /admin/node_group/create */
export async function postAdminNodeGroupCreate(
  body: API.CreateNodeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/node_group/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete a node group Delete a node group POST /admin/node_group/delete */
export async function postAdminNodeGroupOpenApiDelete(
  body: API.DeleteNodeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/node_group/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get the list of node groups Get the list of node groups POST /admin/node_group/list */
export async function postAdminNodeGroupList(
  body: API.ListNodeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.ListNodeGroupResponse }>('/admin/node_group/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Update a node group Update a node group POST /admin/node_group/update */
export async function postAdminNodeGroupUpdate(
  body: API.UpdateNodeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/node_group/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create node Create node POST /admin/node/create */
export async function postAdminNodeCreate(
  body: API.CreateNodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/node/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete node Delete node POST /admin/node/delete */
export async function postAdminNodeOpenApiDelete(
  body: API.DeleteNodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/node/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get node list Get node list POST /admin/node/list */
export async function postAdminNodeList(
  body: API.ListNodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.ListNodeResponse }>('/admin/node/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Update node Update node POST /admin/node/update */
export async function postAdminNodeUpdate(
  body: API.UpdateNodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/node/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create a new product Create a new product POST /admin/product/create */
export async function postAdminProductCreate(
  body: API.CreateProductRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/product/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete a product Delete a product POST /admin/product/delete */
export async function postAdminProductOpenApiDelete(
  body: API.DeleteProductRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/product/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** List product List product POST /admin/product/list */
export async function postAdminProductList(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.ListProductResponse }>('/admin/product/list', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Update a product Update a product POST /admin/product/update */
export async function postAdminProductUpdate(
  body: API.UpdateProductRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/admin/product/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get user info Get user info POST /admin/user/info */
export async function postAdminUserInfo(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetUserInfoResponse }>('/admin/user/info', {
    method: 'POST',
    ...(options || {}),
  });
}
