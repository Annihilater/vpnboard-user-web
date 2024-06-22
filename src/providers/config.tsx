'use client';

import { postPublicConfigGetSiteConfig } from '@/services/api/public';
import { configState } from '@/stores/config';
import { useMount } from 'ahooks';

export default function ConfigProvider(props: { children?: React.ReactNode }) {
  useMount(async () => {
    const { data } = await postPublicConfigGetSiteConfig({
      skipErrorHandler: true,
    });
    configState.site = data.data;

    document.title = data.data?.site_name;
    let meta = document.createElement('meta');
    meta.content = data.data?.site_desc;
    meta.name = 'description';
    document.getElementsByTagName('head')[0].appendChild(meta);
    let link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', data.data?.site_logo);
    document.getElementsByTagName('head')[0].appendChild(link);
  });
  return props.children;
}
