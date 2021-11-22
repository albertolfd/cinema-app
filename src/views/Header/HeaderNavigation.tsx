import { Button, Grid } from '@mui/material';
import React, { FC } from 'react';
import HeaderButton from 'views/buttons/HeaderButton/HeaderButton';
import SearchField, { SEARCH_FIELD_PLACEHOLDER } from 'views/fields/SearchField/SearchField';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StarIcon from '@mui/icons-material/Star';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useHistory } from 'react-router-dom';
import MovieCategory from 'models/MovieCategory';
import useSearch, { CHANGE_QUERY_SEARCH } from 'hooks/useSearch';
import SearchIcon from '@mui/icons-material/Search';
import { MOVIE_CATALOGUE_PATH, SEARCH_PATH } from 'routes/Routes';
import styles from './HeaderNavigation.module.scss';

interface HeaderNavigationProps {
  displayDirection?: 'row' | 'column';
  activeCategory: MovieCategory;
  isSearching: boolean;
  onNavigateHandler: (isSearching: boolean, category?: MovieCategory) => void;
}

const HeaderNavigation: FC<HeaderNavigationProps> = (props: HeaderNavigationProps) => {
  const { displayDirection, activeCategory, isSearching, onNavigateHandler } = props;

  const history = useHistory();
  const { searchQueryState, dispatch } = useSearch();
  const { searchQuery } = searchQueryState;

  const rootFlexDirection = displayDirection ?? 'row';

  const onClickHandler = (path: string, category: MovieCategory) => {
    onNavigateHandler(false, category);
    history.push(path, { category });
  };

  const onSearchHandler = (query: string) => {
    if (history.location.pathname !== '/search' && query.length > 0) {
      onNavigateHandler(true);
      history.push(SEARCH_PATH);
    } else if (history.location.pathname === '/search' && query.length === 0) {
      onNavigateHandler(false);
      history.goBack();
    }

    dispatch(CHANGE_QUERY_SEARCH, query);
  };

  const onSearchMobileHandler = () => {
    onNavigateHandler(true);
    history.push(SEARCH_PATH);
  };

  return (
    <Grid
      container
      display="flex"
      alignItems={rootFlexDirection === 'row' ? 'center' : 'start'}
      flexDirection={rootFlexDirection}
      rowSpacing={1}
    >
      <Grid item>
        <HeaderButton
          label={MovieCategory.NOW_PLAYING}
          Icon={LocalMoviesIcon}
          className={
            !isSearching && activeCategory === MovieCategory.NOW_PLAYING
              ? styles.activeItem
              : undefined
          }
          onClickHandler={() => onClickHandler('/', MovieCategory.NOW_PLAYING)}
        />
      </Grid>

      <Grid item>
        <Button
          variant="header"
          startIcon={<ControlPointIcon />}
          onClick={() => onClickHandler('/', MovieCategory.UPCOMING)}
          className={
            !isSearching && activeCategory === MovieCategory.UPCOMING
              ? styles.activeItem
              : undefined
          }
        >
          {MovieCategory.UPCOMING}
        </Button>
      </Grid>

      <Grid item>
        <HeaderButton
          label={MovieCategory.POPULAR}
          Icon={LocalFireDepartmentIcon}
          onClickHandler={() => onClickHandler(MOVIE_CATALOGUE_PATH, MovieCategory.POPULAR)}
          className={
            !isSearching && activeCategory === MovieCategory.POPULAR ? styles.activeItem : undefined
          }
        />
      </Grid>

      <Grid item>
        <Button
          className={`${styles.headerText} ${
            !isSearching && activeCategory === MovieCategory.TOP_RATED ? styles.activeItem : ''
          }`}
          startIcon={<StarIcon />}
          onClick={() => onClickHandler(MOVIE_CATALOGUE_PATH, MovieCategory.TOP_RATED)}
        >
          {MovieCategory.TOP_RATED}
        </Button>
      </Grid>

      <Grid item>
        {rootFlexDirection === 'row' ? (
          <SearchField
            value={searchQuery}
            onChangeHandler={(query) => onSearchHandler(query)}
            placeholder={SEARCH_FIELD_PLACEHOLDER}
          />
        ) : (
          <Button
            className={`${styles.headerText} ${isSearching ? styles.activeItem : ''}`}
            startIcon={<SearchIcon />}
            onClick={onSearchMobileHandler}
          >
            Search
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default HeaderNavigation;
