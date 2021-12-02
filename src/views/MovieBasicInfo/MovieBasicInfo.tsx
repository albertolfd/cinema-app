import { Grid, Typography } from '@mui/material';
import Genre from 'models/Genre';
import React, { FC } from 'react';
import Rating from 'views/Rating/Rating';
import styles from './MovieBasicInfo.module.scss';

interface MovieBasicInfoProps {
  id: number;
  title: string;
  releaseDate: Date;
  genres: Array<Genre>;
  voteAverage: number;
  voteCount: number;
}

const MovieBasicInfo: FC<MovieBasicInfoProps> = (props: MovieBasicInfoProps) => {
  const { id, title, releaseDate, genres, voteAverage, voteCount } = props;

  return (
    <Grid container direction="column">
      {/** Title & release date */}
      <Grid item container spacing={2} display="flex" alignItems="end">
        <Grid item>
          <Typography variant="h1" color="secondary">
            {title}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5" color="textSecondary">
            {releaseDate}
          </Typography>
        </Grid>
      </Grid>

      {/** Genres */}
      <Grid item container spacing={3} marginTop="2%">
        {genres.map((genre) => (
          <Grid item key={`Genre-${genre.id}`}>
            <Typography
              key={`Genre-${genre.id}`}
              color="primary"
              fontWeight="bold"
              sx={{ textTransform: 'uppercase' }}
            >
              {genre.name}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid item container spacing={2} marginTop="2%" display="flex" alignItems="center">
        <Grid item>
          <Rating
            rating={voteAverage}
            movieId={id}
            textClassName={styles.movieRating}
            starsSize={35}
          />
        </Grid>

        <Grid item>
          <Typography variant="h6" color="textSecondary">
            {voteCount} reviews
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieBasicInfo;
