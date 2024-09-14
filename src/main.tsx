import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '~/styles/globalStyle.scss';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ThemeProvider } from '@mui/material';
import { persistor, store } from './store';
import { App } from './App';
import { MUITheme } from './styles/theme';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <ThemeProvider theme={MUITheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>,
  );
}
