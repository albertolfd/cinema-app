import { Box, Button, Typography, Grid, Divider } from '@mui/material';
import React, { FC } from 'react';
import { Movie } from 'routes/MovieCatalogue';
import DividerView from 'views/Divider/DividerView';
import ImageListView from 'views/lists/ImageList/ImageListView';
import PaginationView from 'views/Pagination/PaginationViewn';
import Rating from 'views/Rating/Rating';

interface MovieListProps {
  movies: Array<Movie>;
}

const MovieList: FC<MovieListProps> = (props: MovieListProps) => {
  const { movies } = props;

  return (
    <>
      <DividerView text="Now Playing" />
      <Grid container paddingTop={2} alignItems="center" justifyContent="center">
        {/* <Typography color="textPrimary" flexGrow={1} marginBottom={2} marginRight={2} variant="h6">
          Now Playing
        </Typography> */}

        <Box marginBottom={2}>
          <PaginationView />
        </Box>
      </Grid>

      <ImageListView
        items={movies.map((movie) => {
          return {
            key: movie.title,
            image: movie.image,
            title: movie.title,
            subtitle: (
              <Box>
                <Rating rating={movie.rating} movieTitle={movie.title} />
              </Box>
            ),
            children: (
              <Box display="flex" alignItems="center">
                <Button variant="contained">Read more</Button>
              </Box>
            )
          };
        })}
      />
    </>
  );
};

export default MovieList;
