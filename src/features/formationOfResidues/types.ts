import { FormationOfResiduesData } from './dataModule';

export type SortType = {
  field: keyof FormationOfResiduesData[number];
  order: 'asc' | 'desc';
};

export interface DataTableColumn<T extends object> {
  id: string;
  name: string;
  field: keyof T;
  fieldValidationType: FieldValidationType;
}

export type DataTableColumnSortType<T> = {
  field: keyof T;
  order: 'asc' | 'desc';
};

export type FieldValidationType = 'number' | 'string';

export interface DataTableCellSubmitData<T> {
  rowId: number;
  field: keyof T;
  value: string | number;
}

export type NullableAllKeys<I> = {
  [K in keyof I]: I[K] | null;
};

export type DataFiltersValues = NullableAllKeys<
  Pick<FormationOfResiduesData[number], 'barCode' | 'article' | 'size' | 'category'>
>;

export type FiltersFields = Pick<FormationOfResiduesData[number], 'category'>;

export type FiltersVariants = {
  [K in keyof FiltersFields as `${K}FilterValues`]: { id: string; value: FiltersFields[K]; name: string }[];
};
