'use client';

import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';

export default function Page() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'title',
      header: '标题',
    },
    {
      accessorKey: 'status',
      header: '状态',
      cell: ({ row }) => <Badge>{row.getValue('status')}</Badge>,
    },
    {
      accessorKey: 'updated_at',
      header: '更新时间',
      cell: ({ row }) => formatDate(row.getValue('updated_at'), 'yyyy-MM-dd HH:mm:ss'),
    },
    {
      id: 'actions',
      accessorKey: 'id',
      header: () => <div className='text-right'>操作</div>,
      cell: ({ row }) => {
        return (
          <div className='flex justify-end gap-2'>
            <Button
              size='sm'
              onClick={() => {
                setTicket({
                  id: 1,
                  title: '静态数据',
                  context: '这里是描述遇到了什么问题',
                  created_at: new Date(),
                  updated_at: new Date(),
                });
              }}
            >
              回复
            </Button>
            <DeleteButton
              trigger='关闭'
              title='你确定要关闭吗?'
              description=''
              onConfirm={async () => {}}
              onCancelText='取消'
              onConfirmText='确认'
            />
          </div>
        );
      },
    },
  ];

  const [ticket, setTicket] = useState({} as any);
  const [message, setMessage] = useState('');
  const sendRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <DataTable
        header={
          <div className='flex items-center justify-between'>
            <h1>工单列表</h1>
            <Tabs defaultValue='enable'>
              <TabsList>
                <TabsTrigger value='enable'>已开启</TabsTrigger>
                <TabsTrigger value='close'>已关闭</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        }
        columns={columns}
        data={[
          {
            id: 1,
            title: '静态数据',
            status: '开启',
            context: '',
            updated_at: `2024-06-16 00:18:58`,
          },
        ]}
        pagination={{
          page: 1,
          size: 0,
          total: 0,
        }}
      />
      <Drawer
        open={!!ticket?.id}
        onOpenChange={(open) => {
          if (!open) setTicket(null);
        }}
      >
        <DrawerContent className='container h-screen'>
          <DrawerHeader className='border-b'>
            <DrawerTitle>{ticket?.title}</DrawerTitle>
            <DrawerDescription>{ticket?.context}</DrawerDescription>
          </DrawerHeader>
          <div className='flex flex-col gap-4 p-4'>
            <div
              className={cn('flex items-center gap-4', {
                'flex-row-reverse': false,
              })}
            >
              <div
                className={cn('flex flex-col gap-1', {
                  'items-end': false,
                })}
              >
                <p className='text-sm text-muted-foreground'>
                  {formatDate(new Date('2024-06-16 00:18:58'), 'yyyy-MM-dd HH:mm:ss')}
                </p>
                <p
                  className={cn('w-fit rounded-lg bg-accent p-2 font-medium', {
                    'bg-primary text-primary-foreground': false,
                  })}
                >
                  回复
                </p>
              </div>
            </div>
            <div
              className={cn('flex items-center gap-4', {
                'flex-row-reverse': true,
              })}
            >
              <div
                className={cn('flex flex-col gap-1', {
                  'items-end': true,
                })}
              >
                <p className='text-sm text-muted-foreground'>
                  {formatDate(new Date('2024-06-16 00:18:58'), 'yyyy-MM-dd HH:mm:ss')}
                </p>
                <p
                  className={cn('w-fit rounded-lg bg-accent p-2 font-medium', {
                    'bg-primary text-primary-foreground': true,
                  })}
                >
                  演示
                </p>
              </div>
            </div>
          </div>
          <DrawerFooter className='flex w-full flex-row items-center gap-2'>
            <Button variant='outline' className='p-0'>
              <Label htmlFor='picture' className='p-2'>
                <Icon icon='mdi:image' className='text-2xl' />
              </Label>
              <Input id='picture' type='file' className='hidden' />
            </Button>
            <Input
              placeholder='请在此输入您的问题，我们会尽快回复您。'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || (e.keyCode === 13 && message.trim())) {
                  sendRef?.current?.click();
                }
              }}
            />
            <Button
              ref={sendRef}
              onClick={async () => {
                setMessage('');
              }}
            >
              发送
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
