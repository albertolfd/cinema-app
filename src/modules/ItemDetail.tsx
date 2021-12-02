import { Box, Grid, Typography } from '@mui/material';
import Movie from 'models/Movie';
import React, { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getImagePath, GetMovie } from 'services/MovieService';
import CarouselImage from 'views/ImageViews/CarouselImage/CarouselImage';
import ImagePoster from 'views/ImageViews/ImagePoster/ImagePoster';
import MovieBasicInfo from 'views/MovieBasicInfo/MovieBasicInfo';
import TabsView, { TabViewProps } from 'views/Tabs/TabsView';

interface ItemDetailProps {
  movieId: string;
}

const ItemDetail: FC = () => {
  const { movieId } = useParams<ItemDetailProps>();

  const movieQuery = useQuery<Movie, Error>(['getMovie', movieId], () => GetMovie(Number(movieId)));
  const movie = movieQuery.data;

  const itemDetailTabs = useMemo((): Array<TabViewProps> => {
    return [
      {
        label: 'Overview',
        tabContent: (
          <Typography color="textPrimary" variant="h1">
            Overview
          </Typography>
        )
      },
      {
        label: 'Crew',
        tabContent: (
          <Typography color="textPrimary" variant="h1">
            Crew
          </Typography>
        )
      },
      {
        label: 'Media',
        tabContent: (
          <Typography color="textPrimary" variant="h1">
            Media
          </Typography>
        )
      },
      {
        label: 'Reviews',
        tabContent: (
          <Typography color="textPrimary" variant="h1">
            Reviews
          </Typography>
        )
      }
    ];
  }, []);

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

              {/** Dark layout */}
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

            <Box>
              <Grid item container direction="column">
                <Grid item>
                  <MovieBasicInfo
                    id={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    genres={movie.genres}
                    voteAverage={movie.vote_average}
                    voteCount={movie.vote_count}
                  />
                </Grid>

                <Grid item paddingTop={12}>
                  <TabsView tabs={itemDetailTabs} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ItemDetail;
