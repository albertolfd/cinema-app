import React, { FC } from 'react';
import SkeletonView from 'views/loadingIndicators/SkeletonView/SkeletonView';
import styles from './LoadMoreButton.module.scss';

interface LoadMoreButtonProps {
  onClickHandler: () => void;
  loadingMore?: boolean;
  hasMoreToLoad?: boolean;
  loading?: boolean;
}

const LoadMoreButton: FC<LoadMoreButtonProps> = (props: LoadMoreButtonProps) => {
  const { onClickHandler, loadingMore, hasMoreToLoad, loading } = props;

  return (
    <>
      {loading ? (
        <SkeletonView variant="text" height="25px" />
      ) : (
        <div className={styles.loadMoreButton} onClick={onClickHandler}>
          {loadingMore ? 'Loading more...' : hasMoreToLoad ? 'Load more' : 'Nothing more to load'}
        </div>
      )}
    </>
  );
};

export default LoadMoreButton;
