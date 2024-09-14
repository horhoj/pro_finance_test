import { Box, Typography } from '@mui/material';

interface InfoFieldProps {
  label: string;
  content: string;
}
export function InfoField({ content, label }: InfoFieldProps) {
  return (
    <Box>
      <Typography variant={'caption'} sx={{ color: '#636f90' }}>
        {label}
      </Typography>
      <Typography>{content}</Typography>
    </Box>
  );
}
