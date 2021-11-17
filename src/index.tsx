import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '@fontsource/roboto';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from 'views/Header/Header';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from 'themes/GlobalTheme';
import MovieCatalogue from 'routes/MovieCatalogue';
import { QueryClient, QueryClientProvider } from 'react-query';
import Theater from 'routes/Theater';
import SearchList from 'routes/SearchList';
import { configureSearchQueryState } from 'hooks/useSearch';
import reportWebVitals from './reportWebVitals';

// Create React Query client
const queryClient = new QueryClient();

configureSearchQueryState();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Router>
            <Header>
              <Switch>
                <Route path="/movieCatalogue">
                  <MovieCatalogue />
                </Route>

                <Route path="/search">
                  <SearchList />
                </Route>

                <Route>
                  <Theater />
                </Route>
              </Switch>
            </Header>
          </Router>
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
