import { Box, Grid, Typography } from '@mui/material';
import Movie from 'models/Movie';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getImagePath, GetMovie } from 'services/MovieService';
import CarouselImage from 'views/ImageViews/CarouselImage/CarouselImage';
import ImagePoster from 'views/ImageViews/ImagePoster/ImagePoster';
import Rating from 'views/Rating/Rating';
import styles from './ItemDetail.module.scss';

interface ItemDetailProps {
  movieId: string;
}

const ItemDetail: FC = () => {
  const { movieId } = useParams<ItemDetailProps>();

  const movieQuery = useQuery<Movie, Error>(['getMovie', movieId], () => GetMovie(Number(movieId)));
  const movie = movieQuery.data;

  return (
    <>
      {movie && (
        <Box position="relative">
          {/** Background image */}
          <Box height="50vh" width="100%" position="absolute">
            <Box position="relative" display="flex" height="100%">
              <CarouselImage
                src={getImagePath(movie?.backdrop_path || '')}
                alt={`Movie-Detail-Background-${movie?.id}`}
              />

              <Box
                position="absolute"
                top={0}
                height="100%"
                width="100%"
                sx={{ backgroundColor: '#0000009e' }}
              />
            </Box>
          </Box>

          {/** Main body */}
          <Grid container padding="16vh 4vw 2vh 4vw" position="relative">
            {/** Movie poster */}
            <Grid item display="flex" justifyContent="start" marginRight="5%" marginBottom="5%">
              <ImagePoster
                src={getImagePath(movie?.poster_path || '')}
                alt={`Detail-Foreground-${movie?.id}`}
              />
            </Grid>

            <Grid item>
              {/** Title & release date */}
              <Grid container spacing={2} display="flex" alignItems="end">
                <Grid item>
                  <Typography variant="h1" color="secondary">
                    {movie?.title}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="h5" color="textSecondary">
                    {movie?.release_date}
                  </Typography>
                </Grid>
              </Grid>

              {/** Genres */}
              <Grid container spacing={3} marginTop="2%">
                {movie?.genres.map((genre) => (
                  <Grid item key={`Genre-${genre.id}`}>
                    <Typography
                      key={`Movie-${movie?.id}-Genre-${genre.id}`}
                      color="primary"
                      fontWeight="bold"
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {genre.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={2} marginTop="2%" display="flex" alignItems="center">
                <Grid item>
                  <Rating
                    rating={movie?.vote_average || 0}
                    movieId={movie?.id || 0}
                    textClassName={styles.movieRating}
                    starsSize={35}
                  />
                </Grid>

                <Grid item>
                  <Typography variant="h6" color="textSecondary">
                    {movie?.vote_count} reviews
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ItemDetail;
