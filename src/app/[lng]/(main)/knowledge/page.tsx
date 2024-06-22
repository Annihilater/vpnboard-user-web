'use client';

import { Fragment, useState } from 'react';
import { globalState } from '@/stores/global';
import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { useSnapshot } from 'valtio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Empty from '@/components/empty';
import InfiniteScroll from '@/components/infinite-scroll';

export default function Docs() {
  const { systemMode } = useSnapshot(globalState);
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['postCustomerArticleGetArticleList', 'article'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return {
        data: [
          {
            id: '1',
            title: '文章标题1',
            created_at: '2023-06-01T12:34:56Z',
            updated_at: '2023-06-02T12:34:56Z',
            introduction: '这是文章1的简介。',
            content: '这是文章1的内容。',
          },
          {
            id: '2',
            title: '文章标题2',
            created_at: '2023-06-03T12:34:56Z',
            updated_at: '2023-06-04T12:34:56Z',
            introduction: '这是文章2的简介。',
            content: '这是文章2的内容。',
          },
          {
            id: '3',
            title: '文章标题3',
            created_at: '2023-06-05T12:34:56Z',
            updated_at: '2023-06-06T12:34:56Z',
            introduction: '这是文章3的简介。',
            content: '这是文章3的内容。',
          },
          {
            id: '4',
            title: '文章标题4',
            created_at: '2023-06-07T12:34:56Z',
            updated_at: '2023-06-08T12:34:56Z',
            introduction: '这是文章4的简介。',
            content: '这是文章4的内容。',
          },
          {
            id: '5',
            title: '文章标题5',
            created_at: '2023-06-09T12:34:56Z',
            updated_at: '2023-06-10T12:34:56Z',
            introduction: '这是文章5的简介。',
            content: '这是文章5的内容。',
          },
        ],
        total: 5,
      };
    },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPageParam * 10 >= lastPage.total) return undefined;
      return lastPageParam + 1;
    },
  });
  const dataSource = data?.pages.flatMap((page) => page?.data!).filter((item) => item) || [];
  const [article, setArticle] = useState<any>();

  if (!dataSource?.length) return <Empty />;

  return (
    <Fragment>
      {article && (
        <Card>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <Button
                variant='outline'
                onClick={() => {
                  setArticle(undefined);
                }}
              >
                <ChevronLeft className='size-4' />
                返回
              </Button>
              <CardTitle className='font-medium'>{article.title}</CardTitle>
              <CardDescription>{format(article.created_at, 'yyyy-MM-dd HH:mm:ss')}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Markdown
              className='prose max-w-none dark:prose-invert'
              remarkPlugins={[
                // @ts-ignore
                remarkGfm,
              ]}
              components={{
                code(props) {
                  const { children, className, node, ref, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return (
                    <ScrollArea className='w-full'>
                      <SyntaxHighlighter
                        {...rest}
                        language={match?.[1] || 'bash'}
                        style={systemMode === 'dark' ? oneDark : oneLight}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                      <ScrollBar orientation='horizontal' />
                    </ScrollArea>
                  );
                },
              }}
            >
              {article.content}
            </Markdown>
          </CardContent>
        </Card>
      )}
      <InfiniteScroll
        dataSource={dataSource}
        hasMore={hasNextPage}
        loadMore={fetchNextPage}
        loading={isFetching}
        className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', {
          hidden: !!article,
        })}
        renderItem={(item) => (
          <Card
            key={item.id}
            className='cursor-pointer hover:bg-accent'
            onClick={() => {
              setArticle(item);
            }}
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.introduction}</CardDescription>
              <CardDescription>
                更新时间: {format(item.updated_at, 'yyyy-MM-dd HH:mm:ss')}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      />
    </Fragment>
  );
}
