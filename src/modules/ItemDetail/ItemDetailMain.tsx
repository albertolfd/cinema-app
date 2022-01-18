import { Box, Grid } from '@mui/material';
import Credits from 'models/Credits';
import Movie from 'models/Movie';
import React, { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getImagePath, GetMovie, GetMovieCredits } from 'services/MovieService';
import CarouselImage from 'views/ImageViews/CarouselImage/CarouselImage';
import ImagePoster from 'views/ImageViews/ImagePoster/ImagePoster';
import MovieBasicInfo from 'views/MovieViews/MovieBasicInfo/MovieBasicInfo';
import TabsView, { TabViewProps } from 'views/Tabs/TabsView';
import ItemCrew from './ItemCrew';
import ItemMedia from './ItemMedia';
import ItemOverview from './ItemOverview';
import ItemReview from './ItemReview';

interface ItemDetailMainProps {
  movieId: string;
}

const ItemDetailMain: FC = () => {
  const { movieId } = useParams<ItemDetailMainProps>();

  const movieQuery = useQuery<Movie, Error>(['getMovie', movieId], () => GetMovie(Number(movieId)));
  useQuery<Credits, Error>(['getMovieCredits', movieId], () => GetMovieCredits(Number(movieId)));
  const movie = movieQuery.data;

  const itemDetailTabs = useMemo((): Array<TabViewProps> => {
    return [
      {
        label: 'Overview',
        tabContent: <ItemOverview movieId={movieId} />
      },
      {
        label: 'Crew',
        tabContent: <ItemCrew movieId={movieId} />
      },
      {
        label: 'Media',
        tabContent: <ItemMedia movieId={movieId} />
      },
      {
        label: 'Reviews',
        tabContent: <ItemReview movieId={movieId} />
      }
    ];
  }, [movieId]);

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

            <Grid item container direction="column" xs>
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
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ItemDetailMain;
