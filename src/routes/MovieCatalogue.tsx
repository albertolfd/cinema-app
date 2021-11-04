import React, { FC } from 'react';
import Carousel from 'views/Carousel/Carousel';
import styles from './MovieCatalogue.module.scss';

const items = [
  'https://images-na.ssl-images-amazon.com/images/I/71JvyUXp-aL.jpg',
  'https://image.api.playstation.com/vulcan/img/rnd/202009/2913/TQKAd8U6hnIFQIIcz6qnFh8C.png',
  'https://cl.buscafs.com/www.levelup.com/public/uploads/images/702857/702857.jpg',
  'https://imagessl4.casadellibro.com/a/l/t5/84/9788445076484.jpg',
  'https://m.media-amazon.com/images/I/61zaOA7FU0L._AC_SY679_.jpg',
  'https://telegraphstar.com/wp-content/uploads/2021/10/The-Mandalorian-season-3-starts-filming-%E2%80%93-will-see-the-1280x720.jpg'
];

const MovieCatalogue: FC = () => {
  const carouselItems = items.map((item, index) => (
    <img src={item} alt={`Carousel-Item-Index-${index}`} />
  ));

  return (
    <div className={styles.carouselContainer}>
      <Carousel items={carouselItems} />
    </div>
  );
};

export default MovieCatalogue;
