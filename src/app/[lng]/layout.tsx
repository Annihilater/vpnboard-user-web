import { Noto_Sans as FontSans } from 'next/font/google';
import { BodyAnalytics, HeadAnalytics } from '@/analytics';
import { dir, languages } from '@/i18n';
import { ConfigProvider, ReactQueryProvider } from '@/providers';
import { DEFAULT_SYSTEM_MODE, DEFAULT_THEME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import '../../../tailwind.css';
import LayoutFooter from '@/layout/footer';
import LayoutHeader from './header';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export { metadata, viewport } from '@/lib/site';

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      data-mode={DEFAULT_SYSTEM_MODE}
      data-theme={DEFAULT_THEME}
      style={{
        colorScheme: DEFAULT_SYSTEM_MODE,
      }}
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
        <HeadAnalytics />
        <ConfigProvider />
      </head>
      <body className={cn('w-screen overflow-x-hidden font-sans antialiased', fontSans.variable)}>
        <ReactQueryProvider>
          <LayoutHeader lng={lng} />
          <main className='relative min-h-[calc(100dvh-162px-env(safe-area-inset-top))] '>
            {children}
          </main>
          <LayoutFooter className='container' />
          <Toaster closeButton richColors visibleToasts={9} />
        </ReactQueryProvider>
        <BodyAnalytics />
      </body>
    </html>
  );
}
