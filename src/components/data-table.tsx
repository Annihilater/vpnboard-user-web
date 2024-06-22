'use client';

import { ReactNode, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteButton from './delete-button';
import { ScrollBar } from './ui/scroll-area';

interface DataTableProps<TData, TValue> {
  header?: ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: {
    page?: number;
    size?: number;
    total?: number;
    onChange?: (page: number, size: number) => void;
  };
  operations?: {
    remove?: (rowSelection: TData[]) => Promise<void>;
  };
}

export function DataTable<TData, TValue>({
  header,
  columns,
  data,
  pagination = {},
  operations = {},
}: DataTableProps<TData, TValue>) {
  const { page = 1, size = 50, total = 0, onChange } = pagination;
  const { remove } = operations;
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns: [
      remove &&
        ({
          id: 'select',
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label='Select all'
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label='Select row'
            />
          ),
          enableSorting: false,
          enableHiding: false,
        } as ColumnDef<TData, TValue>),
      ...columns,
    ].filter((item) => item) as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
    pageCount: parseInt(((total + size - 1) / size).toString()),
    onRowSelectionChange: setRowSelection,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: size,
      },
      rowSelection,
    },
  });

  return (
    <div className='flex w-full flex-col gap-2'>
      {header}
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <Alert>
          <AlertTitle className='mb-0 flex items-center justify-between'>
            <span>已选择 {table.getFilteredSelectedRowModel().rows.length} 项</span>
            <DeleteButton
              trigger='批量删除'
              title='你确定要删除这些选项吗?'
              description='删除后数据将无法恢复，请谨慎操作'
              onConfirm={() => {
                remove?.(
                  Object.keys(rowSelection).map((key) => {
                    return data[Number(key)];
                  }),
                );
              }}
              onCancelText='取消'
              onConfirmText='确认'
            />
          </AlertTitle>
        </Alert>
      )}
      <ScrollArea className='w-[calc(100vw-32px)] md:w-auto'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <div className='mt-4 flex items-center justify-between px-2'>
        <div className='text-sm text-muted-foreground'>共 {total} 项</div>
        {table.getPageCount() > 1 && (
          <>
            <div className='text-sm text-muted-foreground'>
              第 {table.getState().pagination.pageIndex + 1} 页 (共 {table.getPageCount()} 页)
            </div>
            <div className='flex items-center space-x-6 lg:space-x-8'>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  className='hidden size-8 p-0 lg:flex'
                  onClick={() => {
                    onChange?.(1, size);
                  }}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className='sr-only'>Go to first page</span>
                  <DoubleArrowLeftIcon className='size-4' />
                </Button>
                <Button
                  variant='outline'
                  className='size-8 p-0'
                  onClick={() => {
                    onChange?.(page - 1, size);
                  }}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className='sr-only'>Go to previous page</span>
                  <ChevronLeftIcon className='size-4' />
                </Button>
                <Button
                  variant='outline'
                  className='size-8 p-0'
                  onClick={() => {
                    onChange?.(page + 1, size);
                  }}
                  disabled={!table.getCanNextPage()}
                >
                  <span className='sr-only'>Go to next page</span>
                  <ChevronRightIcon className='size-4' />
                </Button>
                <Button
                  variant='outline'
                  className='hidden size-8 p-0 lg:flex'
                  onClick={() => {
                    onChange?.(table.getPageCount(), size);
                  }}
                  disabled={!table.getCanNextPage()}
                >
                  <span className='sr-only'>Go to last page</span>
                  <DoubleArrowRightIcon className='size-4' />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
