import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '@fontsource/roboto';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from 'views/Header/Header';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from 'themes/GlobalTheme';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Router>
          <Switch>
            <Header>
              <Route>
                <App />
              </Route>
            </Header>
          </Switch>
        </Router>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
