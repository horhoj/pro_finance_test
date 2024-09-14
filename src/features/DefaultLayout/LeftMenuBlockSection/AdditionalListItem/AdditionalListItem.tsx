import { Box, Typography } from '@mui/material';

interface AdditionalListItemProps {
  children?: React.ReactNode;
}
export function AdditionalListItem({ children }: AdditionalListItemProps) {
  return (
    <Box
      component={'li'}
      sx={{
        '&:not(:last-child)': {
          borderBottom: '1px solid #232a41',
        },
      }}
    >
      <Typography sx={{ padding: '4px' }}>{children}</Typography>
    </Box>
  );
}
