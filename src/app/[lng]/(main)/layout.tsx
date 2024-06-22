'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { postUserUserInfo } from '@/services/api/user';
import { userState } from '@/stores/user';
import { Icon } from '@iconify/react';
import { useMount } from 'ahooks';
import { toast } from 'sonner';
import { useSnapshot } from 'valtio';
import { deleteCookie, getCookie } from '@/lib/cookies';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const routers = [
  {
    name: '主页',
    href: '/dashboard',
  },
  {
    name: '个人信息',
    href: '/profile',
  },
  {
    label: '财务',
  },
  {
    name: '商品列表',
    href: '/product',
  },
  {
    name: '订单列表',
    href: '/order',
  },
  {
    name: '财务中心',
    href: `/wallet`,
  },
  {
    label: '帮助',
  },
  {
    name: '我的工单',
    href: '/ticket',
  },
  {
    name: '使用文档',
    href: '/knowledge',
  },
];

export default function MainLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSnapshot(userState);

  useMount(async () => {
    if (!userInfo && getCookie('Authorization')) {
      try {
        const { data } = await postUserUserInfo({
          skipErrorHandler: true,
        });
        userState.userInfo = data.data;
        setLoading(false);
      } catch (error) {
        deleteCookie('Authorization');
        router.push(`/${lng}`);
      }
    }
  });

  if (loading)
    return (
      <div className='fixed left-0 top-0 z-50 flex size-full flex-col items-center justify-center'>
        <Icon icon='mdi:loading' className='size-12 animate-spin text-primary' />
        <p className='ml-2 text-primary'>Loading...</p>
      </div>
    );

  return (
    <div className='container flex w-full flex-wrap-reverse gap-6 align-top md:flex-nowrap'>
      <nav className='sticky top-[84px] hidden h-96 w-52 shrink-0 flex-col gap-2 text-muted-foreground lg:flex'>
        {routers.map((router) => {
          if (router.label) {
            return (
              <span className='text-muted-foreground' key={router.label}>
                {router.label}
              </span>
            );
          }
          return (
            <Link
              key={`/${lng}${router.href}`}
              href={`/${lng}${router.href}`}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                pathname === `/${lng}${router.href}` ? 'bg-muted text-primary' : 'text-foreground',
              )}
            >
              {router.name}
            </Link>
          );
        })}
      </nav>
      <div className='min-h-[calc(100dvh-162px-env(safe-area-inset-top))] w-full flex-auto gap-6 py-4 md:py-6'>
        {children}
      </div>
      <div className='top-[84px] mt-4 grid size-full min-w-52 shrink-0 grid-cols-2 gap-4 md:sticky md:w-auto md:grid-cols-1 md:flex-col lg:w-52 '>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>账户余额</CardTitle>
            <Button variant='link' className='p-0'>
              充值
            </Button>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{userInfo?.balance?.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>佣金总额</CardTitle>
            <Icon icon='mdi:money' className='text-2xl text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>0.00</CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>邀请人数</CardTitle>
            <Icon icon='mdi:users' className='text-2xl text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>0</CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>邀请总收益</CardTitle>
            <Icon icon='mdi:account-balance' className='text-2xl text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>0.00</CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>邀请码</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    className='size-5 p-0'
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${location.origin}/auth/sign-up?aff=${userInfo?.user_name}`,
                      );
                      toast.success('邀请链接复制成功');
                    }}
                  >
                    <Icon icon='mdi:content-copy' className='text-2xl text-primary' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>复制邀请链接</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className='truncate font-bold'>{userInfo?.user_name}</CardContent>
        </Card>
      </div>
    </div>
  );
}
