import { Button, Grid } from '@mui/material';
import React, { FC, useState } from 'react';
import HeaderButton from 'views/buttons/HeaderButton/HeaderButton';
import SearchField from 'views/fields/SearchField/SearchField';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StarIcon from '@mui/icons-material/Star';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useHistory } from 'react-router-dom';
import MovieCategory from 'models/MovieCategory';
import styles from './HeaderNavigation.module.scss';

interface HeaderNavigationProps {
  displayDirection?: 'row' | 'column';
  onNavigateHandler?: () => void;
}

const HeaderNavigation: FC<HeaderNavigationProps> = (props: HeaderNavigationProps) => {
  const { displayDirection, onNavigateHandler } = props;

  const history = useHistory();

  const rootFlexDirection = displayDirection ?? 'row';

  const [activeCategory, setActiveCategory] = useState(MovieCategory.NOW_PLAYING);

  const onClickHandler = (path: string, category: MovieCategory) => {
    setActiveCategory(category);

    if (onNavigateHandler) {
      onNavigateHandler();
    }

    history.push(path, { category });
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
          className={activeCategory === MovieCategory.NOW_PLAYING ? styles.activeItem : undefined}
          onClickHandler={() => onClickHandler('/', MovieCategory.NOW_PLAYING)}
        />
      </Grid>

      <Grid item>
        <Button
          variant="header"
          startIcon={<ControlPointIcon />}
          onClick={() => onClickHandler('/', MovieCategory.UPCOMING)}
          className={activeCategory === MovieCategory.UPCOMING ? styles.activeItem : undefined}
        >
          {MovieCategory.UPCOMING}
        </Button>
      </Grid>

      <Grid item>
        <HeaderButton
          label={MovieCategory.POPULAR}
          Icon={LocalFireDepartmentIcon}
          onClickHandler={() => onClickHandler('/movieCatalogue', MovieCategory.POPULAR)}
          className={activeCategory === MovieCategory.POPULAR ? styles.activeItem : undefined}
        />
      </Grid>

      <Grid item>
        <Button
          className={`${styles.headerText} ${
            activeCategory === MovieCategory.TOP_RATED ? styles.activeItem : ''
          }`}
          startIcon={<StarIcon />}
          onClick={() => onClickHandler('/movieCatalogue', MovieCategory.TOP_RATED)}
        >
          {MovieCategory.TOP_RATED}
        </Button>
      </Grid>

      <Grid item>
        <SearchField placeholder="Search for a movie" />
      </Grid>
    </Grid>
  );
};

export default HeaderNavigation;
