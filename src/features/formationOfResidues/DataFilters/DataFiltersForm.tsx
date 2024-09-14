import { useFormik } from 'formik';
import { Box, Button, MenuItem, Select, SxProps, TextField, Theme, Typography } from '@mui/material';
import { DataFiltersValues, FiltersVariants } from '../types';
import { getFormikFieldData } from '~/utils/getFormikFieldData';

interface DataFiltersFormProps {
  filters: DataFiltersValues;
  onSubmit: (filterValues: DataFiltersValues) => void;
  filtersVariants: FiltersVariants;
  children?: React.ReactNode;
}
export function DataFiltersForm({ filters, onSubmit, filtersVariants, children }: DataFiltersFormProps) {
  const formik = useFormik<DataFiltersValues>({
    initialValues: filters,
    enableReinitialize: true,

    onSubmit: (values) => {
      const actualFiltersValues: DataFiltersValues = { ...values };
      if (actualFiltersValues.barCode?.trim() === '') {
        actualFiltersValues.barCode = null;
      }
      if (actualFiltersValues.article?.trim() === '') {
        actualFiltersValues.article = null;
      }
      if (actualFiltersValues.size?.trim() === '') {
        actualFiltersValues.size = null;
      }
      if (actualFiltersValues.category?.trim() === '') {
        actualFiltersValues.category = null;
      }
      onSubmit(actualFiltersValues);
    },
  });

  const handleFiltersReset = () => {
    onSubmit({ article: null, barCode: null, category: null, size: null });
    formik.resetForm();
  };

  const barCodeFieldData = getFormikFieldData(formik, 'barCode');
  const articleFieldData = getFormikFieldData(formik, 'article');
  const sizeFieldData = getFormikFieldData(formik, 'size');
  const categoryFieldData = getFormikFieldData(formik, 'category');

  return (
    <Box>
      <Box component={'form'} noValidate autoComplete={'off'} onSubmit={formik.handleSubmit} sx={formSx}>
        <Box sx={formRowSx}>
          <Box sx={fieldWrapperSx}>
            <Typography sx={fieldBtnSx}>Баркод</Typography>
            <TextField
              sx={fieldSx}
              variant={'standard'}
              {...barCodeFieldData.fieldProps}
              value={barCodeFieldData.fieldProps.value ?? ''}
              slotProps={{ input: { disableUnderline: true } }}
            />
          </Box>

          <Box sx={fieldWrapperSx}>
            <Typography sx={fieldBtnSx}>Артикул</Typography>
            <TextField
              sx={fieldSx}
              variant={'standard'}
              {...articleFieldData.fieldProps}
              value={articleFieldData.fieldProps.value ?? ''}
              slotProps={{ input: { disableUnderline: true } }}
            />
          </Box>

          <Box sx={{ ...fieldWrapperSx, width: '200px' }}>
            <Typography sx={fieldBtnSx}>Размер</Typography>
            <TextField
              variant={'standard'}
              sx={fieldSx}
              {...sizeFieldData.fieldProps}
              value={sizeFieldData.fieldProps.value ?? ''}
              slotProps={{ input: { disableUnderline: true } }}
            />
          </Box>

          <Box sx={{ ...fieldWrapperSx, flexDirection: 'column', width: '150px', alignItems: 'flex-start', gap: '0' }}>
            <Typography sx={fieldBtnSx}>Категория</Typography>
            <Select
              sx={selectSx}
              {...categoryFieldData.fieldProps}
              value={categoryFieldData.fieldProps.value ?? ''}
              variant={'standard'}
              disableUnderline
            >
              {filtersVariants.categoryFilterValues.map((category) => (
                <MenuItem value={category.value} key={category.id} sx={{ fontSize: '14px' }}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box sx={formRowSx}>
          <Button type={'submit'} sx={submitBtnSx}>
            Сформировать
          </Button>
          <Button type={'button'} sx={submitBtnSx} onClick={handleFiltersReset}>
            Сбросить фильтры
          </Button>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

const fieldWrapperSx: SxProps<Theme> = {
  display: 'flex',
  backgroundColor: '#fff',
  width: '280px',
  padding: '5px 15px',
  borderRadius: '20px',
  gap: '20px',
  alignItems: 'center',
};

const fieldSx: SxProps<Theme> = {
  backgroundColor: '#f7f8f8',
  padding: '5px 15px',
  borderRadius: '20px',
  fontSize: '14px',
};

const formSx: SxProps<Theme> = { display: 'flex', gap: '15px', flexDirection: 'column' };
const formRowSx: SxProps<Theme> = { display: 'flex', gap: '15px' };

const selectSx: SxProps<Theme> = { width: '100%', fontSize: '14px' };

const submitBtnSx: SxProps<Theme> = {
  backgroundColor: '#287eff',
  color: '#fff',
  borderRadius: '20px',
  padding: '10px 15px',
};

const fieldBtnSx: SxProps<Theme> = { fontSize: '14px' };
