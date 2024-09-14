import { Button, Typography } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';

export function FeedbackButton() {
  return (
    <Button variant={'contained'} sx={{ backgroundColor: '#287eff', height: '60px', borderRadius: '20px' }}>
      <ChatBubbleOutline />
      <Typography sx={{ marginLeft: '10px' }}>Связаться с нами</Typography>
    </Button>
  );
}
