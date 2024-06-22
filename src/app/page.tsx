'use client';

import { redirect } from 'next/navigation';
import { useLanguage } from '@/i18n';

export default function RootPage() {
  const { lng } = useLanguage();

  return redirect(`/${lng}`);
}
