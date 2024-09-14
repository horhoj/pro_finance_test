import { Box, Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import { useMemo, useState } from 'react';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { DataTableCellSubmitData, DataTableColumn, DataTableColumnSortType } from '../types';
import styles from './DataTable.module.scss';
import { DataTableCellEditor } from './DataTableCellEditor';

interface DataItem {
  id: number;
}

export type NumberFilter<I> = {
  [K in keyof I as I[K] extends number ? K : never]: I[K];
};

interface DataTableProps<T extends DataItem> {
  columnList: DataTableColumn<T>[];
  dataList: T[];
  sumFields: (keyof NumberFilter<T>)[];
  onSort: (field: keyof T) => void;
  sort: DataTableColumnSortType<T> | null;
  onCellSubmit: (data: DataTableCellSubmitData<T>) => void;
}

export function DataTable<T extends DataItem>({
  columnList,
  dataList,
  sumFields,
  onSort,
  sort,
  onCellSubmit,
}: DataTableProps<T>) {
  const sumFieldValues = useMemo(() => {
    const values: Record<string, number> = {};
    dataList.forEach((dataItem) => {
      sumFields.forEach((field) => {
        const val = dataItem[field];
        if (values[field as string] === undefined) {
          values[field as string] = val as number;
        } else {
          values[field as string] += val as number;
        }
      });
    });

    return values;
  }, [columnList, sumFields, dataList]);

  const [editData, setEditData] = useState<{ rowId: number; field: keyof T } | null>(null);

  const handleSort = (field: keyof T) => {
    setEditData(null);
    onSort(field);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', padding: '10px 15px', borderRadius: '20px', overflow: 'auto' }}>
      <Table sx={{ borderCollapse: 'separate' }}>
        <TableHead>
          <TableRow>
            {columnList.map((column) => (
              <TableCell key={column.id}>
                <Button
                  endIcon={
                    sort?.field === column.field ? sort.order === 'asc' ? <ArrowUpward /> : <ArrowDownward /> : ''
                  }
                  onClick={() => handleSort(column.field)}
                  sx={{ fontSize: '14px', color: '#333' }}
                >
                  {column.name}
                </Button>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((row, i) => (
            <TableRow key={row.id}>
              {columnList.map((column) => (
                <TableCell
                  key={column.id}
                  onDoubleClick={() => setEditData({ field: column.field, rowId: row.id })}
                  sx={{
                    fontSize: '14px',
                    backgroundColor: i % 2 === 0 ? '#eff1f2' : '#fafbfb',
                    height: '60px',
                  }}
                >
                  {editData?.field === column.field && editData.rowId === row.id ? (
                    <DataTableCellEditor
                      value={row[column.field as keyof DataItem]}
                      fieldValidationType={column.fieldValidationType}
                      onSubmit={(value) => {
                        setEditData(null);
                        onCellSubmit({ rowId: row.id, field: column.field, value });
                      }}
                      onCancel={() => setEditData(null)}
                    />
                  ) : column.fieldValidationType === 'number' ? (
                    (row[column.field as keyof DataItem] ?? '').toLocaleString()
                  ) : (
                    row[column.field as keyof DataItem] ?? ''
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {columnList.map((column, i) => (
              <TableCell key={column.id} sx={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                {i === 0 ? 'Итого' : ''}
                {(sumFieldValues[column.field as string] ?? '').toLocaleString()}
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
}
