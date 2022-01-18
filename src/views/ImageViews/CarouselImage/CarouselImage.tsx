import React, { FC } from 'react';
import LazyImage from '../LazyImage/LazyImage';
import styles from './CarouselImage.module.scss';

interface CarouselImageProps {
  src: string;
  alt: string;
}

const CarouselImage: FC<CarouselImageProps> = (props: CarouselImageProps) => {
  const { src, alt } = props;

  return <LazyImage src={src} alt={alt} className={styles.carouselImage} />;
};

export default CarouselImage;
