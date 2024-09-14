import { GetApp } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { mkConfig, generateCsv } from 'export-to-csv';
import { formationOfResiduesGetDataSelector } from '../formationOfResiduesSlice';
import { useAppSelector } from '~/store/hooks';

export function DataExport() {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const data = useAppSelector(formationOfResiduesGetDataSelector);

  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleExportToJSON = async () => {
    setMenuAnchorEl(null);
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportToCSV = async () => {
    setMenuAnchorEl(null);
    if (data !== null) {
      const csvConfig = mkConfig({ useKeysAsHeaders: true });
      const csv = generateCsv(csvConfig)(data);
      const blob = new Blob([String(csv)], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `data.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <Button
        id="export-button"
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleMenuOpen}
        variant={'text'}
        sx={{ backgroundColor: '#283047', color: '#fff', borderRadius: '20px', padding: '10px 15px' }}
        startIcon={<GetApp />}
      >
        Экспорт
      </Button>
      <Menu
        id="export-menu"
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={() => setMenuAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'export-button',
        }}
      >
        <MenuItem onClick={handleExportToJSON}>Выгрузить отфильтрованные и сортированные данные в JSON</MenuItem>
        <MenuItem onClick={handleExportToCSV}>Выгрузить отфильтрованные и сортированные данные в CSV</MenuItem>
      </Menu>
    </>
  );
}
