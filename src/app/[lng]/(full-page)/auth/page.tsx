'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  postPublicUserCheck,
  postPublicUserCreate,
  postPublicUserLogin,
} from '@/services/api/public';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useLocalStorageState } from 'ahooks';
import CryptoJS from 'crypto-js';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { setCookie } from '@/lib/cookies';
import useMounted from '@/hooks/useMounted';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const email = z.object({
  user_name: z.string().email('邮箱格式错误'),
});
const login = email.extend({
  password: z.string(),
  remember: z.boolean().optional(),
});
const register = email
  .extend({
    password: z.string(),
    repeat_password: z.string(),
    remember: z.boolean().optional(),
  })
  .superRefine(({ password, repeat_password }, ctx) => {
    if (password !== repeat_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '两次密码输入不一致',
        path: ['repeat_password'],
      });
    }
  });

const schema = {
  login,
  register,
};

export default function Login({ params: { lng } }: { params: { lng: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useLocalStorageState<'login' | 'register'>('login-type');
  const [initialValues, setInitialValues] = useLocalStorageState<
    API.LoginRequest & { remember?: boolean }
  >('user-login');

  const FormSchema = type ? schema[type] : email;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const { user_name, remember, password } = data as z.infer<typeof register>;
    const params = {
      ...data,
      password:
        password === initialValues?.password ? password : CryptoJS.MD5(password!).toString(),
    };
    const onLogin = (token: string) => {
      setCookie('Authorization', token);
      setInitialValues(remember ? { ...params, remember: true } : undefined);
      setType(remember ? 'login' : undefined);
      router.push(`/${lng}/dashboard`);
    };
    try {
      switch (type) {
        case 'login':
          const login = await postPublicUserLogin(params);
          toast.success('登录成功');
          onLogin(login.data.data.token);
          break;
        case 'register':
          const create = await postPublicUserCreate(params);
          toast.success('注册成功');
          onLogin(create.data.data.token);
          break;
        default:
          const check = await postPublicUserCheck({ user_name });
          setType(check.data.data.type === 0 ? 'register' : 'login');
          setLoading(false);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  }

  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <div className='flex min-h-[calc(100vh-64px-58px-32px)] items-center justify-center '>
      <Card className='mx-auto max-w-sm flex-1'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>登录/注册</CardTitle>
          <CardDescription>立刻开启激动的极致互联网体验</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              <FormField
                control={form.control}
                name='user_name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='电子邮箱' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type !== undefined && (
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type='password' placeholder='密码' required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {type === 'register' && (
                <FormField
                  control={form.control}
                  name='repeat_password'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type='password' placeholder='密码' required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {type !== undefined && (
                <FormField
                  control={form.control}
                  name='remember'
                  render={({ field }) => (
                    <FormItem className='flex items-end gap-2'>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className='leading-none'>
                        <FormLabel>记住密码</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              <Button type='submit' disabled={loading}>
                {loading && <Icon icon='mdi:loading' className='animate-spi mr-2' />}
                {type === 'login' && '登录'}
                {type === 'register' && '注册'}
                {type === undefined && '继续'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
