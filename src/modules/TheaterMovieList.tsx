import { Box } from '@mui/material';
import MovieCategory from 'models/MovieCategory';
import React, { FC, useEffect, useMemo, useState } from 'react';
import DividerView from 'views/Divider/DividerView';
import ImageListView from 'views/lists/ImageList/ImageListView';
import Rating from 'views/Rating/Rating';
import Page from 'models/Page';
import { useInfiniteQuery } from 'react-query';
import { getImagePath, GetMoviesByCategory } from 'services/MovieService';
import Movie from 'models/Movie';
import Carousel from 'views/Carousel/Carousel';
import LoadMoreButton from 'views/buttons/LoadMoreButton/LoadMoreButton';
import RealFloatingButton from 'views/buttons/RealFloatingButton/RealFloatingButton';
import { useLocation } from 'react-router-dom';
import ReadMoreButton from 'views/buttons/ReadMoreButton/ReadMoreButton';
import CarouselImage from 'views/ImageViews/CarouselImage/CarouselImage';

const TheaterMovieList: FC = () => {
  const location = useLocation<{ category: MovieCategory }>();

  const [category, setCategory] = useState(
    location.state ? location.state.category : MovieCategory.NOW_PLAYING
  );

  useEffect(() => {
    setCategory(location.state ? location.state.category : MovieCategory.NOW_PLAYING);
  }, [location.state]);

  const movieQuery = useInfiniteQuery<Page<Movie>, Error>(
    ['getMoviesByCategory', category],
    ({ pageParam = 1 }) => GetMoviesByCategory(category, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.page;

        if (currentPage < lastPage.total_pages) {
          return lastPage.page + 1;
        }

        return undefined;
      }
    }
  );

  const movies = useMemo(() => {
    const movieList: Array<Movie> = [];

    const moviePages = movieQuery.data?.pages;
    if (moviePages) {
      moviePages.forEach((page) => movieList.push(...page.results));
    }

    return movieList;
  }, [movieQuery.data?.pages]);

  const carouselItems = useMemo(() => {
    const movieItems = movieQuery.data?.pages[0].results;

    if (movieItems) {
      const movieSlice = movieItems
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(5, movieItems.length));

      return movieSlice.map((movie) => (
        <CarouselImage
          src={getImagePath(movie.backdrop_path)}
          alt={`Carousel-Item-Id-${movie.id}`}
        />
      ));
    }

    return [];
  }, [movieQuery.data?.pages]);

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
          // #region Image List
        }
        <ImageListView
          reachListBottomHandler={
            category === MovieCategory.NOW_PLAYING ? () => movieQuery.fetchNextPage() : () => {}
          }
          loading={movieQuery.isLoading}
          items={movies.map((movie) => {
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
          })}
        />
        {
          // #endregion
        }

        {
          // #region Load more
        }
        <LoadMoreButton
          onClickHandler={() => movieQuery.fetchNextPage()}
          loadingMore={movieQuery.isFetchingNextPage}
          hasMoreToLoad={movieQuery.hasNextPage}
          loading={movieQuery.isLoading}
        />
        {
          // #endregion
        }
      </Box>
      {!movieQuery.isLoading && <RealFloatingButton onClickHandler={() => window.scrollTo(0, 0)} />}{' '}
    </>
  );
};

export default TheaterMovieList;
