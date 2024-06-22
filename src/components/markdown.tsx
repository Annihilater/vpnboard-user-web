'use client';

import { ReactNode } from 'react';
import { globalState } from '@/stores/global';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { useSnapshot } from 'valtio';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export default function Markdown({ children }: { children: string }) {
  const { mode } = useSnapshot(globalState);
  return (
    <ReactMarkdown
      className='prose max-w-none dark:prose-invert'
      remarkPlugins={[
        // @ts-ignore
        remarkGfm,
      ]}
      components={{
        // @ts-ignore
        code(props) {
          const { children, className, node, ref, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return (
            <ScrollArea className='w-full'>
              <SyntaxHighlighter
                {...rest}
                language={match?.[1] || 'bash'}
                style={mode === 'dark' ? oneDark : oneLight}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
