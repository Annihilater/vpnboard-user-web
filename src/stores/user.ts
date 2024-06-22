import { proxy } from 'valtio';

export const userState = proxy<{
  userInfo?: API.GetUserInfoResponse;
}>();
