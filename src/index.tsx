import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '@fontsource/roboto';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from 'themes/GlobalTheme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { configureSearchQueryState } from 'hooks/useSearch';
import GlobalRouter from 'routes/GlobalRouter';
import reportWebVitals from './reportWebVitals';

// Create React Query client
const queryClient = new QueryClient();

configureSearchQueryState();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <GlobalRouter />
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
