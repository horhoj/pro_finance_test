import { Box, Typography } from '@mui/material';
import { DataLoader } from '../DataLoader';
import { DataView } from '../DataView';
import { DataFilters } from '../DataFilters';
import { Title } from '../Title';

export function FormationOfResiduesWidget() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <Title />
      <DataFilters />
      <DataLoader />
      <DataView />
    </Box>
  );
}
