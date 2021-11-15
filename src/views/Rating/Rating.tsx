import React, { FC, useMemo } from 'react';
import StarIcon from '@mui/icons-material/Star';
import styles from './Rating.module.scss';

interface RatingProps {
  rating: number;
  movieId: number;
}

const NUMBER_STARS = 5;
const HOLLOW_STARS_COLOR = '#bdbdbd';
const FILLED_STARS_COLOR = '#ffbc0b';

const Rating: FC<RatingProps> = (props: RatingProps) => {
  const { rating, movieId } = props;

  const hollowStars = useMemo(() => {
    const starList: Array<JSX.Element> = [];

    for (let i = 0; i < NUMBER_STARS; i++) {
      starList.push(
        <StarIcon key={`Rating-Movie-${movieId}-Star-${i}`} sx={{ fill: HOLLOW_STARS_COLOR }} />
      );
    }

    return starList;
  }, [movieId]);

  const filledStars = useMemo(() => {
    const starList: Array<JSX.Element> = [];

    for (let i = 0; i < NUMBER_STARS; i++) {
      starList.push(
        <StarIcon key={`Rating-Movie-${movieId}-Star-${i}`} sx={{ fill: FILLED_STARS_COLOR }} />
      );
    }

    return starList;
  }, [movieId]);

  return (
    <div className={styles.ratingRoot}>
      <div className={styles.starsContainer}>
        <div>{hollowStars}</div>

        <div
          className={styles.hollowStarsContainer}
          style={{ width: `${Math.floor((rating / 10) * 100)}%` }}
        >
          {filledStars}
        </div>
      </div>

      <span className={styles.ratingNumber}>{Number(((rating / 10) * 5).toFixed(1))}</span>
    </div>
  );
};

export default Rating;
