import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import useSearch, { CHANGE_QUERY_SEARCH } from 'hooks/useSearch';
import Movie from 'models/Movie';
import Page from 'models/Page';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { SearchMovies, getImagePath } from 'services/MovieService';
import ReadMoreButton from 'views/buttons/ReadMoreButton/ReadMoreButton';
import DividerView from 'views/Divider/DividerView';
import SearchField, { SEARCH_FIELD_PLACEHOLDER } from 'views/fields/SearchField/SearchField';
import ImageListView from 'views/lists/ImageList/ImageListView';
import PaginationView from 'views/Pagination/PaginationViewn';
import Rating from 'views/Rating/Rating';

const SearchList: FC = () => {
  const { searchQueryState, dispatch } = useSearch();
  const { searchQuery } = searchQueryState;

  const theme = useTheme();
  const isMediumSizeScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [page, setPage] = useState(1);
  const movieQuery = useQuery<Page<Movie>, Error>(
    ['getMoviesBySearchQuery', searchQuery, page],
    () => SearchMovies(searchQuery, page),
    { keepPreviousData: true }
  );

  return (
    <Box padding="30px 30px">
      {isMediumSizeScreen && (
        <Box display="flex" justifyContent="center">
          <SearchField
            value={searchQuery}
            onChangeHandler={(query) => dispatch(CHANGE_QUERY_SEARCH, query)}
            placeholder={SEARCH_FIELD_PLACEHOLDER}
          />
        </Box>
      )}

      {
        // #region Divider & Category title
      }
      <DividerView text={`Results for: ${searchQuery}`} loading={movieQuery.isLoading} />
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
  );
};

export default SearchList;
