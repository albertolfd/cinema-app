import React, { FC } from 'react';
import styles from './LoadMoreButton.module.scss';

interface LoadMoreButtonProps {
  onClickHandler: () => void;
  loadingMore?: boolean;
  hasMoreToLoad?: boolean;
}

const LoadMoreButton: FC<LoadMoreButtonProps> = (props: LoadMoreButtonProps) => {
  const { onClickHandler, loadingMore, hasMoreToLoad } = props;

  return (
    <div className={styles.loadMoreButton} onClick={onClickHandler}>
      {loadingMore ? 'Loading more...' : hasMoreToLoad ? 'Load more' : 'Nothing more to load'}
    </div>
  );
};

export default LoadMoreButton;
