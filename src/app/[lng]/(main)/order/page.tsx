'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Empty from '@/components/empty';
import InfiniteScroll from '@/components/infinite-scroll';

export default function Page() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['postCustomerOrderGetOrderList', 'order'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return {
        total: 3,
        data: [
          {
            id: '1',
            out_trade_no: '1234567890',
            created_at: '2023-06-01T12:34:56Z',
            subject: '商品标题1',
            price: 100.0,
            original_amount: 120.0,
            pay_type: '支付宝',
            total_amount: 120.0,
            trade_status: 'TRADE_SUCCESS',
            updated_at: '2023-06-02T12:34:56Z',
          },
          {
            id: '2',
            out_trade_no: '0987654321',
            created_at: '2023-06-01T12:34:56Z',
            subject: '商品标题2',
            price: 200.0,
            original_amount: 220.0,
            pay_type: '微信支付',
            total_amount: 220.0,
            trade_status: 'WAIT_BUYER_PAY',
            updated_at: '2023-06-02T12:34:56Z',
          },
          {
            id: '3',
            out_trade_no: '1122334455',
            created_at: '2023-06-01T12:34:56Z',
            subject: '商品标题3',
            price: 300.0,
            original_amount: 320.0,
            pay_type: null,
            total_amount: 320.0,
            trade_status: 'TRADE_CLOSED',
            updated_at: '2023-06-02T12:34:56Z',
          },
        ],
      };
    },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPageParam * 10 >= lastPage.total) return undefined;
      return lastPageParam + 1;
    },
  });
  const dataSource = data?.pages.flatMap((page) => page?.data!);

  if (!dataSource?.length) return <Empty />;
  return (
    <InfiniteScroll
      dataSource={dataSource}
      hasMore={hasNextPage}
      loadMore={fetchNextPage}
      loading={isFetching}
      className='flex flex-col gap-4'
      renderItem={(item) => (
        <Card key={item.id} className='overflow-hidden'>
          <CardHeader
            className={cn(
              'flex flex-col items-start justify-between bg-muted/50 px-6 py-3 md:flex-row md:items-center',
              {
                'bg-yellow-500/20': item.trade_status === 'WAIT_BUYER_PAY',
                'bg-green-500/20': item.trade_status === 'TRADE_SUCCESS',
              },
            )}
          >
            <CardTitle>订单 {item.out_trade_no}</CardTitle>
            <CardDescription className='text-xs text-muted-foreground'>
              创建时间{' '}
              <time dateTime={item.created_at}>
                {format(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss')}
              </time>
            </CardDescription>
          </CardHeader>
          <CardContent className='p-6 text-sm'>
            <ul className='grid grid-cols-3 gap-3 *:flex *:flex-col lg:grid-cols-5'>
              <li>
                <span className='text-muted-foreground'>商品标题</span>
                <span>{item.subject}</span>
              </li>
              <li>
                <span className='text-muted-foreground'>商品价格</span>
                <span>{item.price}</span>
              </li>
              <li>
                <span className='text-muted-foreground'>订单金额</span>
                <span>{item.original_amount}</span>
              </li>
              <li>
                <span className='text-muted-foreground'>支付方式</span>
                <span>{item.pay_type || '已取消'}</span>
              </li>
              <li className='font-semibold'>
                <span className='text-muted-foreground'>总金额</span>
                <span>{item.total_amount}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className='flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3'>
            <span className='text-xs text-muted-foreground'>
              更新时间{' '}
              <time dateTime={item.updated_at}>
                {format(new Date(item.updated_at), 'yyyy-MM-dd HH:mm:ss')}
              </time>
            </span>
            {item.trade_status === 'WAIT_BUYER_PAY' && (
              <Button>
                <CreditCard className='mr-2 size-5' /> 去支付
              </Button>
            )}
            {item.trade_status === 'TRADE_SUCCESS' && (
              <span className='text-xs text-green-500'>已支付</span>
            )}
            {item.trade_status === 'TRADE_CLOSED' && (
              <span className='text-xs text-red-500'>已关闭</span>
            )}
          </CardFooter>
        </Card>
      )}
    />
  );
}
