import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Menu,
  MenuItem,
  SvgIconTypeMap,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Settings, EditNote, Report, LibraryBooks } from '@mui/icons-material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { LeftMenuBlockWrapper } from '../LeftMenuBlockWrapper';
import { LeftMenuBlockSection } from '../LeftMenuBlockSection';
import { getUUID } from '~/utils/getUUID';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
}

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque minima sunt, vero tenetur perferendis qui vitae iure, dignissimos sequi, maxime magni consequatur enim inventore aut. Assumenda, totam, rerum magni nam obcaecati atque, unde distinctio quo minima modi corrupti enim vel! Omnis, natus! Vitae recusandae officiis quos cupiditate suscipit accusantium? Eveniet?';

const accordionData: AccordionItem[] = [
  { id: getUUID(), title: 'Настройки', content: lorem, icon: Settings },
  { id: getUUID(), title: 'Внесение данных', content: lorem, icon: EditNote },
  { id: getUUID(), title: 'Отчеты', content: lorem, icon: Report },
  { id: getUUID(), title: 'База знаний', content: lorem, icon: LibraryBooks },
];

export function FinControlBlock() {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleAccordionChange = (expandedId: string) => () => {
    setExpandedId((prev) => (prev === expandedId ? null : expandedId));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <LeftMenuBlockWrapper>
      <LeftMenuBlockSection>
        <Box sx={{ display: 'flex', alignItems: 'center' }} component={'span'}>
          <Button variant={'contained'} sx={{ padding: '1px 4px', minWidth: 0, marginRight: '5px' }}>
            ФИН
          </Button>
          <Typography>контроль</Typography>
        </Box>
        <Button
          id="basic-button"
          aria-controls={isMenuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? 'true' : undefined}
          onClick={handleMenuOpen}
          variant={'text'}
          sx={MenuBtnSx}
          endIcon={<Settings />}
        >
          Меню
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={menuAnchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Пункт 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Пункт 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Пункт 3</MenuItem>
        </Menu>
      </LeftMenuBlockSection>
      {accordionData.map((el) => (
        <Accordion expanded={expandedId === el.id} onChange={handleAccordionChange(el.id)} key={el.id} sx={accordionSx}>
          <AccordionSummary>
            <Box sx={accordionSummaryContent}>
              <el.icon sx={accordionSummaryElIconSx} />
              <Typography>{el.title}</Typography>
              {expandedId === el.id ? (
                <ArrowDropUpIcon sx={accordionExpandStatusIconSx} />
              ) : (
                <ArrowDropDownIcon sx={accordionExpandStatusIconSx} />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={accordionDetailsSx}>
            <Typography>{el.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </LeftMenuBlockWrapper>
  );
}

const accordionExpandStatusIconSx: SxProps<Theme> = { margin: 'auto 0 auto auto', color: '#636f90' };

const accordionSummaryElIconSx: SxProps<Theme> = { width: '20px' };

const accordionSummaryContent: SxProps<Theme> = { display: 'flex', gap: '10px', width: '100%' };

const accordionDetailsSx: SxProps<Theme> = {
  display: 'flex',
  gap: '10px',
  width: '100%',
  borderTop: '3px solid #171d2c',
};

const accordionSx: SxProps<Theme> = {
  '&.MuiAccordion-root': {
    marginBottom: '3px',
    marginTop: '3px',
    borderRadius: '10px',
    backgroundColor: '#283047',
    color: '#fff',
  },
  '&.Mui-expanded': {
    marginBottom: '10px',
    marginTop: '10px',
  },
};

const MenuBtnSx: SxProps<Theme> = { backgroundColor: '#283047', color: '#636f90', borderRadius: '15px' };
