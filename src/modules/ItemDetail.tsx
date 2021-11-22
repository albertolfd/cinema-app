import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Movie from 'models/Movie';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getImagePath, GetMovie } from 'services/MovieService';
import ImagePoster from 'views/ImageViews/ImagePoster/ImagePoster';
import LazyImage from 'views/ImageViews/LazyImage/LazyImage';
import Rating from 'views/Rating/Rating';

interface ItemDetailProps {
  movieId: string;
}

const ItemDetail: FC = () => {
  const { movieId } = useParams<ItemDetailProps>();

  const theme = useTheme();
  const isMobileSizeScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const movieQuery = useQuery<Movie, Error>(['getMovie', movieId], () => GetMovie(Number(movieId)));
  const movie = movieQuery.data;
  return (
    <Box position="relative">
      {/** Background image */}
      <Box height="50vh" width="100%" position="absolute">
        <Box position="relative" display="flex" height="100%">
          <LazyImage
            src={getImagePath(movie?.backdrop_path || '')}
            alt={`Movie-Detail-Background-${movie?.id}`}
            style={{ objectFit: 'cover', width: '100%' }}
          />

          <Box
            position="absolute"
            top={0}
            height="100%"
            width="100%"
            sx={{ backgroundColor: '#00000066' }}
          />
        </Box>
      </Box>

      {/** Main body */}
      <Box padding="16vh 5vw 2vh 5vw" position="relative">
        {/** Movie poster */}
        <Box width={isMobileSizeScreen ? '70%' : '50%'} display="flex" justifyContent="start">
          <ImagePoster
            src={getImagePath(movie?.poster_path || '')}
            alt={`Detail-Foreground-${movie?.id}`}
          />
        </Box>

        {/** Title & release date */}
        <Grid container spacing={2} marginTop="3%" display="flex" alignItems="end">
          <Grid item>
            <Typography variant="h1" color="secondary">
              {movie?.title}
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography variant="h5" color="textSecondary">
              {movie?.release_date}
            </Typography>
          </Grid>
        </Grid>

        {/** Genres */}
        <Grid container spacing={3} marginTop="2%">
          {movie?.genres.map((genre) => (
            <Grid item>
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

        <Grid container spacing={2} marginTop="2%">
          <Grid item>
            <Rating rating={movie?.vote_average || 0} movieId={movie?.id || 0} />
          </Grid>

          <Grid item>
            <Typography>{movie?.vote_count} reviews</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ItemDetail;
