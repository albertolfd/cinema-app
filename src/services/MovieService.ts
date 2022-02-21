import Credits from 'models/Credits';
import Movie from 'models/Movie';
import MovieCategory from 'models/MovieCategory';
import MovieImages from 'models/MovieImages';
import MovieVideos from 'models/MovieVideos';
import Page from 'models/Page';
import Review from 'models/Review';
import {
  BASE_PATH,
  MOVIE_PATH,
  CREDITS_PATH,
  MOVIE_IMAGES_PATH,
  MOVIE_VIDEOS_PATH,
  MOVIE_REVIEWS_PATH,
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

/**
 * Helper function to execute get requests
 * and convert the json response to an object of type T
 * @param url to make the GET request
 * @returns a promise that resolves to an object of type T
 */
const fetchAndExtractResponse = async <T>(url: URL): Promise<T> => {
  const response = await fetch(url.toString(), {
    method: 'GET'
  }).catch((error) => {
    throw new Error(error);
  });

  const responseObject: T = await response.json().catch((error) => {
    throw new Error(error);
  });

  return responseObject;
};

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

  return fetchAndExtractResponse(url);
};

/**
 * Requests a list of movies that match the user query
 * @param query input text to filter movies
 * @param page of the resulting movie list
 * @returns a promise that resolves to the resulting movie page
 */
export const SearchMovies = async (query: string, page: number): Promise<Page<Movie>> => {
  const url = new URL(`${BASE_PATH}${SEARCH_PATH}${MOVIE_PATH}`);

  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_MOVIE_API_KEY || '',
    language: LANGUAGE,
    query,
    page: page.toString(),
    region: REGION
  }).toString();

  return fetchAndExtractResponse(url);
};

export const GetMovie = async (movieId: number): Promise<Movie> => {
  const url = new URL(`${BASE_PATH}${MOVIE_PATH}/${movieId}`);

  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_MOVIE_API_KEY || '',
    language: LANGUAGE
  }).toString();

  return fetchAndExtractResponse(url);
};

export const GetMovieCredits = async (movieId: number): Promise<Credits> => {
  const url = new URL(`${BASE_PATH}${MOVIE_PATH}/${movieId}${CREDITS_PATH}`);

  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_MOVIE_API_KEY || '',
    language: LANGUAGE
  }).toString();

  return fetchAndExtractResponse(url);
};

export const GetMovieImages = async (movieId: number): Promise<MovieImages> => {
  const url = new URL(`${BASE_PATH}${MOVIE_PATH}/${movieId}${MOVIE_IMAGES_PATH}`);

  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_MOVIE_API_KEY || '',
    language: LANGUAGE,
    include_image_language: 'en'
  }).toString();

  return fetchAndExtractResponse(url);
};

export const GetMovieVideos = async (movieId: number): Promise<MovieVideos> => {
  const url = new URL(`${BASE_PATH}${MOVIE_PATH}/${movieId}${MOVIE_VIDEOS_PATH}`);

  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_MOVIE_API_KEY || '',
    language: LANGUAGE
  }).toString();

  return fetchAndExtractResponse(url);
};

export const GetMovieReviews = async (movieId: number, page: number): Promise<Page<Review>> => {
  const url = new URL(`${BASE_PATH}${MOVIE_PATH}/${movieId}${MOVIE_REVIEWS_PATH}`);

  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_MOVIE_API_KEY || '',
    language: LANGUAGE,
    page: page.toString()
  }).toString();

  return fetchAndExtractResponse(url);
};

/**
 * Helper function that builds the absolute path to stored images
 * @param imagePath id of the requested image
 * @returns the absolute path to the stored image
 */
export const getImagePath = (imagePath: string): string => {
  return `${IMAGE_BASE_PATH}${imagePath}`;
};
