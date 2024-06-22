'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import HeaderLogo from '@/layout/header-logo';
import { postUserUserInfo } from '@/services/api/user';
import { userState } from '@/stores/user';
import { Icon } from '@iconify/react';
import { useMount } from 'ahooks';
import { useSnapshot } from 'valtio';
import { deleteCookie, getCookie } from '@/lib/cookies';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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

export default function LayoutHeader({ lng }: { lng: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { userInfo } = useSnapshot(userState);

  useMount(async () => {
    if (!userInfo && getCookie('Authorization')) {
      try {
        const { data } = await postUserUserInfo({
          skipErrorHandler: true,
        });
        userState.userInfo = data.data;
      } catch (error) {
        deleteCookie('Authorization');
        userState.userInfo = undefined;
      }
    }
  });

  return (
    <header className='sticky top-0 z-50 h-16 border-b bg-muted/40 backdrop-blur-md lg:h-[60px]'>
      <div className='container flex h-full items-center gap-4'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='shrink-0 lg:hidden'>
              <Icon icon='mdi:menu' className='size-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='flex flex-col '>
            <ScrollArea>
              <nav className='grid gap-2 text-sm font-medium '>
                {routers.map((item) => {
                  if (item.label) {
                    return (
                      <span className='text-muted-foreground' key={item.label}>
                        {item.label}
                      </span>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={`/${lng}${item.href}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-4 rounded-xl px-4 py-2 hover:text-foreground',
                        pathname === `/${lng}${item.href}`
                          ? 'bg-muted text-primary'
                          : 'text-foreground',
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className='flex w-full flex-1 justify-center lg:justify-start'>
          <HeaderLogo />
        </div>
        {userInfo ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full border'>
                <Icon icon='mdi:user' className='size-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {routers.map((item, index) =>
                item.href ? (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={() => {
                      router.push(`/${lng}${item.href}`);
                    }}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuSeparator key={index} />
                ),
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  userState.userInfo = undefined;
                  deleteCookie('Authorization');
                  router.push(`/${lng}`);
                }}
              >
                <Icon icon='mdi:exit' className='mr-2 size-4' />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={`/${lng}/auth`}>
            <Button> 登录/注册</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
