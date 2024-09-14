import { Box, SxProps, Theme } from '@mui/material';

interface LeftMenuBlockSectionProps {
  children?: React.ReactNode;
}
export function LeftMenuBlockSection({ children }: LeftMenuBlockSectionProps) {
  return (
    <Box sx={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {children}
    </Box>
  );
}
