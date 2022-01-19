import Genre from './Genre';
import ProductionCompany from './ProductionCompany';
import ProductionCountry from './ProductionCountry';
import SpokenLanguages from './SpokenLanguages';

interface Movie {
  backdrop_path: string;
  budget: number;
  genres: Array<Genre>;
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ProductionCompany>;
  production_countries: Array<ProductionCountry>;
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: Array<SpokenLanguages>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default Movie;
