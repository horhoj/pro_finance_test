import { Box, SxProps, Theme } from '@mui/material';

interface LeftMenuBlockWrapperProps {
  children?: React.ReactNode;
}
export function LeftMenuBlockWrapper({ children }: LeftMenuBlockWrapperProps) {
  return <Box sx={FinControlBlockSx}>{children}</Box>;
}

const FinControlBlockSx: SxProps<Theme> = {
  backgroundColor: '#171d2c',
  // maxWidth: '350px',
  color: '#fff',
  padding: '10px',
  borderRadius: '20px',
};
