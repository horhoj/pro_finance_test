import { LibraryBooks } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

export function Title() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <Typography variant={'h4'}>Остатки сформированы на 01.04.2023 г.</Typography>
      <Button
        sx={{ backgroundColor: '#283047', borderRadius: '20px', color: '#fff', padding: '5px 20px' }}
        startIcon={<LibraryBooks />}
      >
        Инструкции
      </Button>
    </Box>
  );
}
