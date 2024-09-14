import { Box, Button, SxProps, Theme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { DriveFileMove, Note, Clear } from '@mui/icons-material';
import { isFormationOfResiduesData } from '../dataModule';
import { formationOfResiduesSlice } from '../formationOfResiduesSlice';
import dataFromProjectRoot from '~/../data.json';
import { unknownTaskShowMessage } from '~/utils/unknownTaskShowMessage';

const errorCb = (msg: string) => {
  alert(`Загружаемый файл не содержит ожидаемую структуру: ${msg}`);
};

export function DataLoader() {
  const dispatch = useDispatch();

  const handleLoadFromProjectRoot = () => {
    dispatch(formationOfResiduesSlice.actions.clear());
    if (isFormationOfResiduesData(dataFromProjectRoot, errorCb)) {
      dispatch(formationOfResiduesSlice.actions.setData(dataFromProjectRoot));
    }
  };

  const handleLoadAnyFile = async () => {
    dispatch(formationOfResiduesSlice.actions.clear());
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = () => {
      if (input.files) {
        const file = input.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataFormAnyFile = JSON.parse(String(e.target?.result));
            if (isFormationOfResiduesData(dataFormAnyFile, errorCb)) {
              dispatch(formationOfResiduesSlice.actions.setData(dataFormAnyFile));
            }
          };
          reader.readAsText(file);
        }
      }
    };
    input.click();
  };

  const handleClear = () => {
    dispatch(formationOfResiduesSlice.actions.clear());
  };

  return (
    <Box sx={wrapperSx}>
      <Button onClick={handleLoadFromProjectRoot} startIcon={<DriveFileMove />} sx={buttonSx}>
        Загрузить данные из JSON(корень проекта)
      </Button>
      <Button onClick={handleLoadAnyFile} sx={buttonSx} startIcon={<DriveFileMove />}>
        Загрузить данные из JSON(любой файл)
      </Button>
      <Button onClick={unknownTaskShowMessage} sx={buttonSx} startIcon={<Note />}>
        Изменить данные
      </Button>
      <Box sx={splitterSx} />
      <Button onClick={handleClear} sx={buttonSx} startIcon={<Clear />}>
        Очистить
      </Button>
    </Box>
  );
}

const buttonSx: SxProps<Theme> = { color: '#333', fontSize: '14px' };

const splitterSx: SxProps<Theme> = {
  width: '2px',
  backgroundColor: '#dee1e4',
  height: '20px',
  margin: 'auto 30px auto auto',
};

const wrapperSx: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-start',
  borderTop: '2px solid #dee1e4',
  borderBottom: '2px solid #dee1e4',
  alignItems: 'center',
  gap: '30px',
};
