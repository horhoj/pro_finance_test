import { Typography } from '@mui/material';
import { formationOfResiduesGetDataSelector, formationOfResiduesSlice } from '../formationOfResiduesSlice';
import { FormationOfResiduesData } from '../dataModule';
import { DataTableCellSubmitData } from '../types';
import { DataTable } from '../DataTable';
import { DataTableColumnList } from '../dataTableColumnListConfig';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function DataView() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(formationOfResiduesGetDataSelector);
  const sort = useAppSelector((state) => state.formationOfResidues.sort);

  const handleSort = (field: keyof FormationOfResiduesData[number]) => {
    dispatch(formationOfResiduesSlice.actions.sort(field));
  };

  const handleCellSubmit = (data: DataTableCellSubmitData<FormationOfResiduesData[number]>) => {
    dispatch(formationOfResiduesSlice.actions.editCell(data));
  };
  return (
    <>
      {data && (
        <DataTable<FormationOfResiduesData[number]>
          columnList={DataTableColumnList}
          dataList={data}
          sumFields={['availableToOrder', 'productsInTransit', 'coast']}
          onSort={handleSort}
          sort={sort}
          onCellSubmit={handleCellSubmit}
        />
      )}
      {data === null && (
        <Typography>
          Данные не загружены, для загрузки загрузите их из корня проекта (data.json), либо из любого файла. Фильтры
          будут доступны после загрузки данных
        </Typography>
      )}
    </>
  );
}
