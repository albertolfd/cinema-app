import React, { FC, useMemo } from 'react';
import StarIcon from '@mui/icons-material/Star';
import styles from './Rating.module.scss';

interface RatingProps {
  rating: number;
  movieId: number;
  textClassName?: string;
  starsSize?: number;
}

const NUMBER_STARS = 5;
const HOLLOW_STARS_COLOR = '#bdbdbd';
const FILLED_STARS_COLOR = '#ffbc0b';

const Rating: FC<RatingProps> = (props: RatingProps) => {
  const { rating, movieId, textClassName, starsSize } = props;

  const hollowStars = useMemo(() => {
    const starList: Array<JSX.Element> = [];

    for (let i = 0; i < NUMBER_STARS; i++) {
      starList.push(
        <StarIcon
          key={`Rating-Movie-${movieId}-Star-${i}`}
          sx={{ fill: HOLLOW_STARS_COLOR }}
          style={{ height: starsSize || undefined, width: starsSize || undefined }}
        />
      );
    }

    return starList;
  }, [movieId, starsSize]);

  const filledStars = useMemo(() => {
    const starList: Array<JSX.Element> = [];

    for (let i = 0; i < NUMBER_STARS; i++) {
      starList.push(
        <StarIcon
          key={`Rating-Movie-${movieId}-Star-${i}`}
          sx={{ fill: FILLED_STARS_COLOR }}
          style={{ height: starsSize || undefined, width: starsSize || undefined }}
        />
      );
    }

    return starList;
  }, [movieId, starsSize]);

  return (
    <div className={styles.ratingRoot}>
      <div className={styles.starsContainer}>
        <div>{hollowStars}</div>

        <div
          className={styles.filledStarsContainer}
          style={{ width: `${Math.floor((rating / 10) * 100)}%` }}
        >
          {filledStars}
        </div>
      </div>

      <span className={`${styles.ratingNumber} ${textClassName}`}>
        {Number(((rating / 10) * 5).toFixed(1))}
      </span>
    </div>
  );
};

export default Rating;
