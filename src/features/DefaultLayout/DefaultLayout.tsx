import { Box } from '@mui/material';
import { FinControlBlock } from './FinControlBlock';
import { SupportBlock } from './SupportBlock';
import { FeedbackButton } from './FeedbackButton';
import { Header } from './Header';

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Box sx={{ display: 'flex', width: '100%', gap: '40px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '350px', maxWidth: '350px' }}>
        <FinControlBlock />
        <SupportBlock />
        <FeedbackButton />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Header />
        <Box sx={{ marginTop: '40px' }}>{children}</Box>
      </Box>
    </Box>
  );
}
