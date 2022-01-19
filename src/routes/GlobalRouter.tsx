import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'views/Header/Header';
import MovieCatalogue from './MovieCatalogue';
import MovieDetail from './MovieDetail';
import { MOVIE_CATALOGUE_PATH, SEARCH_PATH, DETAIL_PATH } from './Routes';
import Search from './Search';
import Theater from './Theater';

const GlobalRouter: FC = () => {
  return (
    <Router>
      <Header>
        <Switch>
          <Route path={MOVIE_CATALOGUE_PATH}>
            <MovieCatalogue />
          </Route>

          <Route path={SEARCH_PATH}>
            <Search />
          </Route>

          <Route path={`${DETAIL_PATH}:movieId`}>
            <MovieDetail />
          </Route>

          <Route>
            <Theater />
          </Route>
        </Switch>
      </Header>
    </Router>
  );
};

export default GlobalRouter;
