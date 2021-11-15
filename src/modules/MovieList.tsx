import { Box, Button, Grid } from '@mui/material';
import MovieCategory from 'models/MovieCategory';
import React, { FC, useEffect, useMemo, useState } from 'react';
import DividerView from 'views/Divider/DividerView';
import ImageListView from 'views/lists/ImageList/ImageListView';
import PaginationView from 'views/Pagination/PaginationViewn';
import Rating from 'views/Rating/Rating';
import Page from 'models/Page';
import { useQuery } from 'react-query';
import { getImagePath, GetMoviesByCategory } from 'services/MovieService';
import Movie from 'models/Movie';
import Carousel from 'views/Carousel/Carousel';
import CssSpinner from 'views/loadingIndicators/CssSpinner/CssSpinner';
import { useLocation } from 'react-router-dom';

const MovieList: FC = () => {
  const location = useLocation<{ category: MovieCategory }>();

  const [category, setCategory] = useState(
    location.state ? location.state.category : MovieCategory.POPULAR
  );

  useEffect(() => {
    setCategory(location.state ? location.state.category : MovieCategory.POPULAR);
  }, [location.state]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  const page = 1;
  const movieQuery = useQuery<Page<Movie>, Error>(
    ['getMoviesByCategory', category, page],
    () => GetMoviesByCategory(category, page),
    { keepPreviousData: true }
  );

  const carouselItems = useMemo(() => {
    const movies = movieQuery.data?.results;

    if (movies) {
      const movieSlice = movies
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(5, movies.length));

      return movieSlice.map((movie) => (
        <img
          src={getImagePath(movie.backdrop_path)}
          alt={`Carousel-Item-Id-${movie.id}`}
          style={{ maxWidth: '100%' }}
        />
      ));
    }

    return undefined;
  }, [movieQuery.data?.results]);

  return (
    <>
      {loading ? (
        <CssSpinner />
      ) : (
        <>
          {
            // #region Carousel
          }
          <Box height="50vh" width="100vw">
            {carouselItems && <Carousel items={carouselItems} loading={movieQuery.isLoading} />}
          </Box>
          {
            // #endregion
          }

          <Box padding="0 30px">
            {
              // #region Divider & Category title
            }
            <DividerView text={category} loading={movieQuery.isLoading} />
            {
              // #endregion
            }

            {
              // #region Pagination
            }
            <Grid container paddingTop={2} alignItems="center" justifyContent="center">
              {/* <Typography color="textPrimary" flexGrow={1} marginBottom={2} marginRight={2} variant="h6">
          Now Playing
        </Typography> */}
              <Box marginBottom={2}>
                <PaginationView loading={movieQuery.isLoading} />
              </Box>
            </Grid>
            {
              // #endregion
            }

            {
              // #region Image List
            }
            {movieQuery.data?.results && (
              <ImageListView
                loading={movieQuery.isLoading}
                items={movieQuery.data.results.map((movie) => {
                  return {
                    key: movie.id,
                    image: getImagePath(movie.poster_path),
                    title: movie.title,
                    subtitle: (
                      <Box>
                        <Rating rating={movie.vote_average} movieId={movie.id} />
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
            )}
            {
              // #endregion
            }
          </Box>
        </>
      )}
    </>
  );
};

export default MovieList;
