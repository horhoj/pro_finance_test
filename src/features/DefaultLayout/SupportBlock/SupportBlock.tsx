import { Box, SxProps, Theme, Typography } from '@mui/material';
import { LeftMenuBlockWrapper } from '../LeftMenuBlockWrapper';
import { LeftMenuBlockSection } from '../LeftMenuBlockSection';
import { InfoField } from '../LeftMenuBlockSection/InfoField';
import { AdditionalListItem } from '../LeftMenuBlockSection/AdditionalListItem';

interface SupportBlockProps {
  children?: React.ReactNode;
}

export function SupportBlock({ children }: SupportBlockProps) {
  return (
    <LeftMenuBlockWrapper>
      <LeftMenuBlockSection>
        <Typography>Техническая поддержка</Typography>
      </LeftMenuBlockSection>
      <LeftMenuBlockSection>
        <InfoField label={'Номер поддержки'} content={'8 (999) 999 99 99'} />
        <InfoField label={'Почта поддержки'} content={'pf@werthesest.ru'} />
      </LeftMenuBlockSection>
      <LeftMenuBlockSection>
        <InfoField label={'Часы работы'} content={'Пн - Пт с 9:00 до 19:00 мск'} />
      </LeftMenuBlockSection>
      <LeftMenuBlockSection>
        <Box component={'ul'} sx={{ listStyle: 'none', color: '#636f90', width: '100%' }}>
          <AdditionalListItem>Пользовательское соглашение</AdditionalListItem>
          <AdditionalListItem>Политика конфиденциальности</AdditionalListItem>
          <AdditionalListItem>Юридическая информация</AdditionalListItem>
          <AdditionalListItem>Публичная оферта</AdditionalListItem>
        </Box>
      </LeftMenuBlockSection>
    </LeftMenuBlockWrapper>
  );
}
