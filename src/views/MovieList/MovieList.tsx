import {
  ImageList,
  ImageListItem,
  Box,
  ImageListItemBar,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import React, { FC } from 'react';
import { Movie } from 'routes/MovieCatalogue';
import Rating from 'views/Rating/Rating';
import styles from './MovieList.module.scss';

interface MovieListProps {
  movies: Array<Movie>;
}

const MovieList: FC<MovieListProps> = (props: MovieListProps) => {
  const { movies } = props;

  const theme = useTheme();

  const cols = useMediaQuery(theme.breakpoints.down('md')) ? 1 : undefined;

  return (
    <ImageList variant="masonry" gap={30} className={styles.movieList} cols={cols}>
      {movies.map((movie) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <ImageListItem key={`List-Movie-${movie.title}`} className={styles.listItem}>
            <img
              src={movie.image}
              alt={`Cover-Movie-${movie.title}`}
              loading="lazy"
              className={styles.listItemImage}
            />

            <Box
              position="absolute"
              height="100%"
              width="100%"
              top={0}
              display="none"
              justifyContent="center"
              className={styles.moreButton}
            >
              <Box display="flex" alignItems="center">
                <Button variant="contained">Read more</Button>
              </Box>
            </Box>

            <ImageListItemBar
              title={movie.title}
              className={styles.listItemBar}
              subtitle={
                <Box>
                  <Rating rating={movie.rating} movieTitle={movie.title} />
                </Box>
              }
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default MovieList;
