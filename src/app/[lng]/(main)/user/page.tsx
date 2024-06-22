'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import UserForm from './user-form';

export default function Page() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'enable',
      header: '启用',
      cell: ({ row }) => {
        return <Switch checked={row.getValue('enabled')} />;
      },
    },
    {
      accessorKey: 'user_name',
      header: '用户名称',
    },
    {
      accessorKey: '',
      header: '余额',
    },
    {
      accessorKey: 'commission',
      header: '佣金',
    },
    {
      accessorKey: 'created_at',
      header: '注册时间',
      cell: ({ row }) => formatDate(row.getValue('created_at'), 'yyyy-MM-dd HH:mm:ss'),
    },
    {
      id: 'actions',
      accessorKey: 'id',
      header: () => <div className='text-right'>操作</div>,
      cell: ({ row }) => {
        return (
          <div className='flex justify-end gap-2'>
            <Button>编辑</Button>
            <DeleteButton
              trigger='删除'
              title='你确定要删除吗?'
              description='删除后数据将无法恢复，请谨慎操作'
              onConfirm={async () => {}}
              onCancelText='取消'
              onConfirmText='确认'
            />
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      header={
        <div className='flex items-center justify-between'>
          <h1>用户列表</h1>
          <UserForm
            trigger='新建'
            title='新建用户'
            onSubmit={async () => {
              return true;
            }}
          />
        </div>
      }
      columns={columns}
      data={[]}
      pagination={{
        page: 1,
        size: 0,
        total: 0,
      }}
      operations={{
        remove: async (rowSelection) => {},
      }}
    />
  );
}
