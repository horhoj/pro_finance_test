import { Box, Button, Typography } from '@mui/material';
import { CalendarMonth, AccountCircle } from '@mui/icons-material';

export function Header() {
  return (
    <Box
      component={'header'}
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        padding: '5px 20px',
        borderRadius: '10px',
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AccountCircle />
          <Typography>Иванов И.И.</Typography>
        </Box>
        <Button
          startIcon={<CalendarMonth />}
          sx={{ padding: '15px', backgroundColor: '#eef5ff', borderRadius: '20px' }}
        >
          Тариф до 15.04.2024
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button
          sx={{ border: '1px solid #333', borderRadius: '20px', color: '#333', padding: '5px 15px', width: '100%' }}
        >
          Выйти
        </Button>
        <Button
          sx={{
            borderRadius: '20px',
            color: '#fff',
            padding: '5px 15px',
            backgroundColor: '#ff6b17',
            border: '1px solid #ff6b17',

            width: '100%',
          }}
        >
          О нас
        </Button>
      </Box>
    </Box>
  );
}
