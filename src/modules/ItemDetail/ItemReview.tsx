import { Grid, Typography } from '@mui/material';
import Page from 'models/Page';
import Review from 'models/Review';
import React, { FC, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { GetMovieReviews } from 'services/MovieService';
import LoadMoreButton from 'views/buttons/LoadMoreButton/LoadMoreButton';
import RealFloatingButton from 'views/buttons/RealFloatingButton/RealFloatingButton';
import DividerView from 'views/Divider/DividerView';

interface ItemReviewProps {
  movieId: string;
}

const ItemReview: FC<ItemReviewProps> = (props: ItemReviewProps) => {
  const { movieId } = props;

  const reviewQuery = useInfiniteQuery<Page<Review>, Error>(
    ['getMovieReviews', movieId],
    ({ pageParam = 1 }) => GetMovieReviews(Number(movieId), pageParam),
    {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.page;

        if (currentPage < lastPage.total_pages) {
          return lastPage.page + 1;
        }

        return undefined;
      }
    }
  );

  const reviews = useMemo(() => {
    const reviewList: Array<Review> = [];

    const reviewPages = reviewQuery.data?.pages;
    if (reviewPages) {
      reviewPages.forEach((page) => reviewList.push(...page.results));
    }

    reviewList.sort(
      (reviewA, reviewB) =>
        new Date(reviewB.created_at).getMilliseconds() -
        new Date(reviewA.created_at).getMilliseconds()
    );

    return reviewList;
  }, [reviewQuery.data?.pages]);

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Typography variant="h6" color="textPrimary" fontWeight="bold">
          Reviews ({reviews.length})
        </Typography>

        <DividerView />
      </Grid>

      {reviews.map((review) => {
        return (
          <Grid key={`Review-${review.id}`} item container spacing={2} direction="column">
            <Grid item container spacing={2} display="flex" alignItems="center">
              <Grid item>
                <Typography variant="highlight" fontWeight="bold">
                  {review.author}
                </Typography>
              </Grid>

              <Grid item>
                <Typography color="textSecondary">
                  {new Date(review.created_at).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Typography color="textPrimary">{review.content}</Typography>
            </Grid>
          </Grid>
        );
      })}

      <Grid item>
        {
          // #region Load more
        }
        <LoadMoreButton
          onClickHandler={() => reviewQuery.fetchNextPage()}
          loadingMore={reviewQuery.isFetchingNextPage}
          hasMoreToLoad={reviewQuery.hasNextPage}
          loading={reviewQuery.isLoading}
        />
        {
          // #endregion
        }
        {!reviewQuery.isLoading && (
          <RealFloatingButton onClickHandler={() => window.scrollTo(0, 0)} />
        )}
      </Grid>
    </Grid>
  );
};

export default ItemReview;
