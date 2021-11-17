import { Box, Grid, Button } from '@mui/material';
import useSearch from 'hooks/useSearch';
import Movie from 'models/Movie';
import Page from 'models/Page';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { SearchMovies, getImagePath } from 'services/MovieService';
import DividerView from 'views/Divider/DividerView';
import ImageListView from 'views/lists/ImageList/ImageListView';
import PaginationView from 'views/Pagination/PaginationViewn';
import Rating from 'views/Rating/Rating';

const SearchListModule: FC = () => {
  const { searchQuery } = useSearch().searchQueryState;

  const [page, setPage] = useState(1);
  const movieQuery = useQuery<Page<Movie>, Error>(
    ['getMoviesBySearchQuery', searchQuery, page],
    () => SearchMovies(searchQuery, page),
    { keepPreviousData: true }
  );

  return (
    <Box padding="30px 30px">
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
        {/* <Typography color="textPrimary" flexGrow={1} marginBottom={2} marginRight={2} variant="h6">
          Now Playing
        </Typography> */}
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
                  children: (
                    <Box display="flex" alignItems="center">
                      <Button variant="contained">Read more</Button>
                    </Box>
                  )
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

export default SearchListModule;
