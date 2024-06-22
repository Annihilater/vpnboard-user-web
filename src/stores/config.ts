import { postPublicConfigGetSiteConfig } from '@/services/api/public';
import { proxy } from 'valtio';

export const configState = proxy<{
  site: API.GetSiteConfigResponse;
}>();
