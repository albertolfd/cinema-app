import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Carousel.module.scss';

interface CarouselProps {
  items: Array<JSX.Element>;
}

const Carousel: FC<CarouselProps> = (props: CarouselProps) => {
  const { items } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevArrowHovering, setPrevArrowHovering] = useState(false);
  const [nextArrowHovering, setNextArrowHovering] = useState(false);

  // #region Auto slide
  const autoSlide = useCallback(() => {
    const activeIndex = (currentIndex + 1) % items.length;

    setCurrentIndex(activeIndex);
  }, [items.length, currentIndex]);

  useEffect(() => {
    const slideInterval = setInterval(() => autoSlide(), 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [autoSlide]);
  // #endregion

  // #region Arrow handler
  const handleNext = () => {
    const activeIndex = (currentIndex + 1) % items.length;

    setCurrentIndex(activeIndex);
  };

  const handlePrevious = () => {
    const activeIndex = (currentIndex + items.length - 1) % items.length;

    setCurrentIndex(activeIndex);
  };
  // #endregion

  // #region Hover arrow animations
  const handleMouseEnterArrow = (arrowType: 'prev' | 'next') => {
    if (arrowType === 'prev') {
      setPrevArrowHovering(true);
    } else {
      setNextArrowHovering(true);
    }
  };

  const handleMouseLeaveArrow = (arrowType: 'prev' | 'next') => {
    if (arrowType === 'prev') {
      setPrevArrowHovering(false);
    } else {
      setNextArrowHovering(false);
    }
  };
  // #endregion

  // #region Indicators
  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const indicators = useMemo(() => {
    const indicatorList: Array<JSX.Element> = [];

    for (let i = 0; i < items.length; i++) {
      indicatorList.push(
        <button
          type="button"
          className={`${styles.indicator} ${i === currentIndex ? styles.activeIndicator : ''}`}
          key={`Carousel-Indicator-${i}`}
          onClick={() => handleIndicatorClick(i)}
        />
      );
    }

    return indicatorList;
  }, [items.length, currentIndex, handleIndicatorClick]);
  // #endregion

  return (
    <div className={styles.carouselRoot}>
      <div className={styles.galleryContainer}>
        <div
          className={`${styles.arrowContainer} ${styles.prevArrowContainer}`}
          onClick={handlePrevious}
          onMouseEnter={() => handleMouseEnterArrow('prev')}
          onMouseLeave={() => handleMouseLeaveArrow('prev')}
          role="navigation"
        >
          <div
            className={`${styles.arrow} ${styles.prevArrow} ${
              prevArrowHovering ? styles.arrowHover : ''
            }`}
          />
        </div>

        <div className={`${styles.itemContainer} ${styles.noselect}`}>{items[currentIndex]}</div>

        <div
          className={`${styles.arrowContainer} ${styles.nextArrowContainer}`}
          onClick={handleNext}
          onMouseEnter={() => handleMouseEnterArrow('next')}
          onMouseLeave={() => handleMouseLeaveArrow('next')}
          role="navigation"
        >
          <div
            className={`${styles.arrow} ${styles.nextArrow} ${
              nextArrowHovering ? styles.arrowHover : ''
            }`}
          />
        </div>
      </div>

      <div className={styles.indicatorContainer}>{indicators}</div>
    </div>
  );
};

export default Carousel;
