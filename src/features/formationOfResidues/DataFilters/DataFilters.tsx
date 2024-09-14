import { Box } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { formationOfResiduesGetFiltersVariantsSelector, formationOfResiduesSlice } from '../formationOfResiduesSlice';
import { DataFiltersValues } from '../types';
import { DataExport } from '../DataExport';
import { DataFiltersForm } from './DataFiltersForm';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function DataFilters() {
  const filtersVariants = useAppSelector(formationOfResiduesGetFiltersVariantsSelector);
  const filters = useAppSelector((state) => state.formationOfResidues.filters);
  const dispatch = useAppDispatch();

  const [formKey, setFormKey] = useState(0);

  useLayoutEffect(() => {
    setFormKey((prev) => prev + 1);
  }, [filters.category, setFormKey]);

  const handleSubmit = (filterValues: DataFiltersValues) => {
    dispatch(formationOfResiduesSlice.actions.setFilters(filterValues));
  };

  return (
    <>
      {filtersVariants && (
        <Box>
          <DataFiltersForm key={formKey} filters={filters} onSubmit={handleSubmit} filtersVariants={filtersVariants}>
            <DataExport />
          </DataFiltersForm>
        </Box>
      )}
    </>
  );
}
