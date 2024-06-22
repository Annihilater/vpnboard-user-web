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
        total: 2,
        data: [
          {
            id: '1',
            out_trade_no: '1234567890',
            created_at: '2023-06-01T12:34:56Z',
            subject: '购买',
            price: 100.0,
            original_amount: 100,
            pay_type: '支付宝',
            updated_at: '2023-06-02T12:34:56Z',
          },
          {
            id: '2',
            out_trade_no: '0987654321',
            created_at: '2023-06-01T12:34:56Z',
            subject: '邀请',
            add_price: 200.0,
            original_amount: 200,
            pay_type: '微信支付',
            trade_status: 'WAIT_BUYER_PAY',
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
    <>
      <Card>
        <CardHeader>
          <CardTitle className='font-medium'>账户余额</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-between'>
          <div className='text-2xl font-bold'>100.00</div>
          <div className='flex gap-2'>
            <Button>充值</Button>
            <Button variant='outline'>提现</Button>
          </div>
        </CardContent>
      </Card>
      <InfiniteScroll
        dataSource={dataSource}
        hasMore={hasNextPage}
        loadMore={fetchNextPage}
        loading={isFetching}
        className='mt-4 flex flex-col gap-4'
        renderItem={(item) => (
          <Card key={item.id} className='overflow-hidden'>
            <CardContent className='p-6 text-sm'>
              <ul className='grid grid-cols-3 gap-3 *:flex *:flex-col lg:grid-cols-4'>
                <li className='font-semibold'>
                  <span className='text-muted-foreground'>时间</span>
                  <time dateTime={item.created_at}>
                    {format(new Date(item.created_at), 'yyyy-MM-dd HH:mm')}
                  </time>
                </li>
                <li>
                  <span className='text-muted-foreground'>类型</span>
                  <span>{item.subject}</span>
                </li>
                {item.price && (
                  <li>
                    <span className='text-muted-foreground'>消费</span>
                    <span className='text-red-500'>-{item.price.toFixed(2)}</span>
                  </li>
                )}
                {item.add_price && (
                  <li>
                    <span className='text-muted-foreground'>收入</span>
                    <span className='text-green-500'>+{item.add_price.toFixed(2)}</span>
                  </li>
                )}
                <li className='text-right font-semibold'>
                  <span className='text-muted-foreground'>剩余金额</span>
                  <span>{item.original_amount.toFixed(2)}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      />
    </>
  );
}
