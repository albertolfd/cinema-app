import { Button, Grid } from '@mui/material';
import React, { FC } from 'react';
import HeaderButton from 'views/buttons/HeaderButton';
import SearchField from 'views/fields/SearchField/SearchField';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StarIcon from '@mui/icons-material/Star';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import styles from './HeaderNavigation.module.scss';

interface HeaderNavigationProps {
  displayDirection?: 'row' | 'column';
}

const HeaderNavigation: FC<HeaderNavigationProps> = (props: HeaderNavigationProps) => {
  const { displayDirection } = props;

  const rootFlexDirection = displayDirection ?? 'row';

  return (
    <Grid
      container
      display="flex"
      alignItems={rootFlexDirection === 'row' ? 'center' : 'start'}
      flexDirection={rootFlexDirection}
      rowSpacing={1}
    >
      <Grid item>
        <HeaderButton label="Now Playing" Icon={LocalMoviesIcon} />
      </Grid>
      <Grid item>
        <HeaderButton label="Popular" Icon={LocalFireDepartmentIcon} />
      </Grid>
      <Grid item>
        <Button className={styles.headerText} startIcon={<StarIcon />}>
          Top Rated
        </Button>
      </Grid>
      <Grid item>
        <Button variant="header" startIcon={<ControlPointIcon />}>
          Upcoming
        </Button>
      </Grid>

      <Grid item>
        <SearchField placeholder="Search for a movie" />
      </Grid>
    </Grid>
  );
};

export default HeaderNavigation;
