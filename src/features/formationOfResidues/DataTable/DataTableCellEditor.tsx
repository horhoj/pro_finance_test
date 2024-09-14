import { useMemo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, ClickAwayListener, TextField, Box, Button } from '@mui/material';
import { FieldValidationType } from '../types';
import { getUUID } from '~/utils/getUUID';
import { Portal } from '~/ui/Portal';
import { getFormikFieldData } from '~/utils/getFormikFieldData';

interface DataTableCellEditorProps {
  value: string | number;
  fieldValidationType: FieldValidationType;
  onSubmit: (value: string | number) => void;
  onCancel: () => void;
}

const VALIDATION_IS_EMPTY_MSG = 'не заполнено';
const VALIDATION_IS_NOT_STRING = 'не строка';
const VALIDATION_IS_NOT_NUMBER = 'не число';

const stringValidationSchema = yup.object({
  value: yup.string().typeError(VALIDATION_IS_NOT_STRING).required(VALIDATION_IS_EMPTY_MSG),
});

const numberValidationSchema = yup.object({
  value: yup.number().typeError(VALIDATION_IS_NOT_NUMBER).required(VALIDATION_IS_EMPTY_MSG),
});

export function DataTableCellEditor({ fieldValidationType, onSubmit, value, onCancel }: DataTableCellEditorProps) {
  const FORM_ID = useMemo(() => `form${getUUID().split('-').join('')}`, []);

  const formik = useFormik<{ value: string | number }>({
    initialValues: {
      value,
    },
    enableReinitialize: true,
    validationSchema: fieldValidationType === 'number' ? numberValidationSchema : stringValidationSchema,
    onSubmit: (values) => {
      if (fieldValidationType === 'number') {
        onSubmit(Number.parseInt(values.value.toString()));
      } else {
        onSubmit(String(values.value));
      }
    },
  });

  const valueFieldData = getFormikFieldData(formik, 'value');

  return (
    <>
      <ClickAwayListener onClickAway={onCancel}>
        <Box component={'span'}>
          <Portal>
            <Box
              component={'form'}
              noValidate
              autoComplete={'off'}
              id={FORM_ID}
              onSubmit={formik.handleSubmit}
              sx={{ display: 'none' }}
            >
              <Button form={FORM_ID} type={'submit'}>
                submit
              </Button>
            </Box>
          </Portal>
          <TextField
            sx={{ width: '100%', maxWidth: '130px', fontSize: '14px' }}
            error={valueFieldData.isError}
            helperText={valueFieldData.errorText}
            variant={'standard'}
            {...valueFieldData.fieldProps}
            slotProps={{ htmlInput: { form: FORM_ID }, input: { sx: { fontSize: '14px' } } }}
            autoFocus={true}
          />
        </Box>
      </ClickAwayListener>
    </>
  );
}
