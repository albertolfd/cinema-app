import Movie from 'models/Movie';
import MovieCategory from 'models/MovieCategory';
import Page from 'models/Page';
import {
  BASE_PATH,
  MOVIE_PATH,
  SEARCH_PATH,
  LATEST_PATH,
  NOW_PLAYING_PATH,
  POPULAR_PATH,
  TOP_RATED_PATH,
  UPCOMING_PATH,
  LANGUAGE,
  IMAGE_BASE_PATH,
  REGION
} from './config/MovieService.json';

export const GetMoviesByCategory = async (
  category: MovieCategory,
  page: number
): Promise<Page<Movie>> => {
  let categoryPath = LATEST_PATH;
  switch (category) {
    case MovieCategory.NOW_PLAYING: {
      categoryPath = NOW_PLAYING_PATH;
      break;
    }
    case MovieCategory.POPULAR: {
      categoryPath = POPULAR_PATH;
      break;
    }
    case MovieCategory.TOP_RATED: {
      categoryPath = TOP_RATED_PATH;
      break;
    }
    case MovieCategory.UPCOMING: {
      categoryPath = UPCOMING_PATH;
      break;
    }
    default: {
      categoryPath = LATEST_PATH;
    }
  }

  const url = new URL(`${BASE_PATH}${MOVIE_PATH}${categoryPath}`);

  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_MOVIE_API_KEY || '',
    language: LANGUAGE,
    page: page.toString(),
    region: REGION
  }).toString();

  const response = await fetch(url.toString(), {
    method: 'GET'
  }).catch((error) => {
    throw new Error(error);
  });

  const moviePage: Page<Movie> = await response.json().catch((error) => {
    throw new Error(error);
  });

  return moviePage;
};

export const SearchMovies = async (query: string, page: number): Promise<Page<Movie>> => {
  const url = new URL(`${BASE_PATH}${SEARCH_PATH}${MOVIE_PATH}`);

  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_MOVIE_API_KEY || '',
    language: LANGUAGE,
    query,
    page: page.toString(),
    region: REGION
  }).toString();

  const response = await fetch(url.toString(), {
    method: 'GET'
  }).catch((error) => {
    throw new Error(error);
  });

  const moviePage: Page<Movie> = await response.json().catch((error) => {
    throw new Error(error);
  });

  return moviePage;
};

export const getImagePath = (imagePath: string): string => {
  return `${IMAGE_BASE_PATH}${imagePath}`;
};
