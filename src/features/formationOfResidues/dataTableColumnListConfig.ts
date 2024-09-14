import { FormationOfResiduesData } from './dataModule';
import { DataTableColumn } from './types';
import { getUUID } from '~/utils/getUUID';

export const DataTableColumnList: DataTableColumn<FormationOfResiduesData[number]>[] = [
  {
    id: getUUID(),
    name: 'Баркод',
    field: 'barCode',
    fieldValidationType: 'string',
  },
  {
    id: getUUID(),
    name: 'Наименование',
    field: 'name',
    fieldValidationType: 'string',
  },
  {
    id: getUUID(),
    name: 'Предмет',
    field: 'subject',
    fieldValidationType: 'string',
  },

  {
    id: getUUID(),
    name: 'Артикул',
    field: 'article',
    fieldValidationType: 'string',
  },
  {
    id: getUUID(),
    name: 'размер',
    field: 'size',
    fieldValidationType: 'string',
  },

  {
    id: getUUID(),
    name: 'Доступно к заказу',
    field: 'availableToOrder',
    fieldValidationType: 'number',
  },
  {
    id: getUUID(),
    name: 'Товары в пути',
    field: 'productsInTransit',
    fieldValidationType: 'number',
  },
  {
    id: getUUID(),
    name: 'Стоимость',
    field: 'coast',
    fieldValidationType: 'number',
  },
];
