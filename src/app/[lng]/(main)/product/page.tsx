'use client';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Ban, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Store() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>();

  const [type, setType] = useState('1');

  function getTabContent(type: string) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
        {[...Array(3)]?.map((item: any, index) => {
          let price = 9.9;
          let unit = '月';

          return (
            <Card className='overflow-hidden' key={index}>
              <CardHeader className='gap-2'>
                <h1 className='text-xl font-medium capitalize lg:text-2xl'>商品标题</h1>
                <p className='text-muted-foreground'>商品描述</p>
                <h2 className='text-2xl font-semibold sm:text-3xl'>
                  ¥ {price} <span className='text-base font-medium'>/ {unit}</span>
                </h2>
                <Button
                  className='size-full'
                  onClick={() => {
                    setOrder({
                      goods_id: item.id,
                      duration: Number(type),
                      order_type: 'New',
                    });
                  }}
                >
                  购买
                </Button>
              </CardHeader>
              <Separator />
              <CardContent className='py-4 text-sm'>
                <div className='grid gap-3'>
                  <div className='font-semibold'>商品详情</div>
                  <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>可用流量</span>
                      <span>200GB</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>连接速度</span>
                      <span>不限速</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>同时连接 IP 数</span>
                      <span>3</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <Separator />
              <CardContent className='py-4 text-sm'>
                <ul className='grid gap-3'>
                  <li className='flex items-center gap-2'>
                    <CircleCheck className='size-4 text-green-500' />
                    <span className='text-muted-foreground'>描述一</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Ban className='size-4 text-red-500' />
                    <span className='text-muted-foreground'>描述二</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <Tabs defaultValue='1' value={type} onValueChange={setType} className=' space-y-4'>
        <h1 className='w-full text-muted-foreground'>区域</h1>
        <TabsList>
          <TabsTrigger value='1'>中国</TabsTrigger>
          <TabsTrigger value='2'>美国</TabsTrigger>
          <TabsTrigger value='6'>韩国</TabsTrigger>
          <TabsTrigger value=''>日本</TabsTrigger>
        </TabsList>
        <h2 className='w-full text-muted-foreground'>商品</h2>
        <TabsContent value='1'>{getTabContent('1')}</TabsContent>
        <TabsContent value='3'>{getTabContent('3')}</TabsContent>
        <TabsContent value='6'>{getTabContent('6')}</TabsContent>
        <TabsContent value='12'>{getTabContent('12')}</TabsContent>
      </Tabs>
    </>
  );
}
