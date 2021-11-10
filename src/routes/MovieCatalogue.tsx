import { Box } from '@mui/material';
import MovieList from 'modules/MovieList';
import React, { FC } from 'react';
import Carousel from 'views/Carousel/Carousel';
import styles from './MovieCatalogue.module.scss';

export interface Movie {
  image: string;
  title: string;
  rating: number;
}

const movies: Array<Movie> = [
  {
    image: 'https://images-na.ssl-images-amazon.com/images/I/71JvyUXp-aL.jpg',
    title: 'La espada de fuego',
    rating: 9
  },
  {
    image:
      'https://image.api.playstation.com/vulcan/img/rnd/202009/2913/TQKAd8U6hnIFQIIcz6qnFh8C.png',
    title: 'The witcher 3: Wild Hunt',
    rating: 9.5
  },
  {
    image: 'https://cl.buscafs.com/www.levelup.com/public/uploads/images/702857/702857.jpg',
    title: 'The Legend of Zelda: Breath of the Wild 2',
    rating: 9.5
  },
  {
    image: 'https://imagessl4.casadellibro.com/a/l/t5/84/9788445076484.jpg',
    title: 'Alejandro Magno y las Águilas de Roma',
    rating: 8.5
  },
  {
    image: 'https://m.media-amazon.com/images/I/61zaOA7FU0L._AC_SY679_.jpg',
    title: 'Golde Axe',
    rating: 10
  },
  {
    image:
      'https://telegraphstar.com/wp-content/uploads/2021/10/The-Mandalorian-season-3-starts-filming-%E2%80%93-will-see-the-1280x720.jpg',
    title: 'The Mandalorian',
    rating: 5
  }
];

const MovieCatalogue: FC = () => {
  const carouselItems = movies.map((movie) => (
    <img
      src={movie.image}
      alt={`Carousel-Item-Title-${movie.title}`}
      style={{ maxWidth: '100%' }}
    />
  ));

  return (
    <Box>
      <div className={styles.carouselContainer}>
        <Carousel items={carouselItems} />
      </div>

      <Box padding="0 30px">
        <MovieList movies={movies} />
      </Box>
    </Box>
  );
};

export default MovieCatalogue;
