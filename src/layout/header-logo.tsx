'use client';

import Image from 'next/image';
import Link from 'next/link';
import { configState } from '@/stores/config';
import { useSnapshot } from 'valtio';

export default function HeaderLogo() {
  const { site } = useSnapshot(configState);
  return (
    <div className='flex h-full items-center'>
      <Link href='/' className='flex items-center gap-2 font-semibold'>
        <Image src={site?.site_logo || '/favicon.ico'} alt='logo' width={48} height={48} />
        <span className='inline-block font-bold'>{site?.site_name}</span>
      </Link>
    </div>
  );
}
