import { Box, Grid } from '@mui/material';
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
import { useLocation } from 'react-router-dom';
import ReadMoreButton from 'views/buttons/ReadMoreButton/ReadMoreButton';
import CarouselImage from 'views/ImageViews/CarouselImage/CarouselImage';

const CatalogueMovieList: FC = () => {
  const location = useLocation<{ category: MovieCategory }>();

  const [category, setCategory] = useState(
    location.state ? location.state.category : MovieCategory.POPULAR
  );

  useEffect(() => {
    setCategory(location.state ? location.state.category : MovieCategory.POPULAR);
  }, [location.state]);

  const [page, setPage] = useState(1);
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
        <CarouselImage
          src={getImagePath(movie.backdrop_path)}
          alt={`Carousel-Item-Id-${movie.id}`}
        />
      ));
    }

    return [];
  }, [movieQuery.data?.results]);

  return (
    <>
      {
        // #region Carousel
      }
      <Box height="50vh" width="100vw">
        <Carousel items={carouselItems} loading={movieQuery.isLoading} />
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
          <Box marginBottom={2}>
            <PaginationView
              loading={movieQuery.isLoading}
              page={page}
              totalPages={movieQuery.data?.total_pages || 0}
              isPreviousData={movieQuery.isPreviousData}
              onChangePageHandler={(newPage) => setPage(newPage)}
            />
          </Box>
        </Grid>
        {
          // #endregion
        }

        {
          // #region Image List
        }
        <ImageListView
          loading={movieQuery.isLoading}
          items={
            movieQuery.data?.results
              ? movieQuery.data.results.map((movie) => {
                  return {
                    key: movie.id,
                    image: getImagePath(movie.poster_path),
                    title: movie.title,
                    subtitle: (
                      <Box>
                        <Rating rating={movie.vote_average} movieId={movie.id} />
                      </Box>
                    ),
                    children: <ReadMoreButton itemId={movie.id} />
                  };
                })
              : []
          }
        />
        {
          // #endregion
        }
      </Box>
    </>
  );
};

export default CatalogueMovieList;
