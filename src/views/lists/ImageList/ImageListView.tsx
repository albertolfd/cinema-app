import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import ImagePoster from 'views/ImageViews/ImagePoster/ImagePoster';
import SkeletonView from 'views/loadingIndicators/SkeletonView/SkeletonView';
import styles from './ImageListView.module.scss';

export interface ImageItem {
  key: number | string;
  image: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

interface ImageListProps {
  items: Array<ImageItem>;
  loading?: boolean;
  reachListBottomHandler?: () => void;
}

const ImageListView: FC<ImageListProps> = (props: ImageListProps) => {
  const { items, loading, reachListBottomHandler } = props;

  const listRef = useRef<HTMLUListElement | null>(null);

  const theme = useTheme();
  const isLargeSizeScreen = useMediaQuery(theme.breakpoints.only('xl'));
  const isBigSizeScreen = useMediaQuery(theme.breakpoints.only('lg'));
  const isMediumSizeScreen = useMediaQuery(theme.breakpoints.only('md'));
  const isSmallSizeScreen = useMediaQuery(theme.breakpoints.only('sm'));
  const isBeforeMobileSizeScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const isMobileSizeScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const cols = useMemo(() => {
    let numberCols = 0;

    if (isMobileSizeScreen) {
      numberCols = 1;
    } else if (isBeforeMobileSizeScreen) {
      numberCols = 2;
    } else if (isSmallSizeScreen) {
      numberCols = 2;
    } else if (isMediumSizeScreen) {
      numberCols = 3;
    } else if (isBigSizeScreen) {
      numberCols = 4;
    } else if (isLargeSizeScreen) {
      numberCols = 5;
    }

    return numberCols;
  }, [
    isMobileSizeScreen,
    isBeforeMobileSizeScreen,
    isSmallSizeScreen,
    isMediumSizeScreen,
    isBigSizeScreen,
    isLargeSizeScreen
  ]);

  // #region Loading Skeleton
  const skeletonList = useMemo(() => {
    const skeletons = [];

    let skeletonNumber = 0;
    if (isMobileSizeScreen) {
      skeletonNumber = 3;
    } else if (isBeforeMobileSizeScreen) {
      skeletonNumber = 4;
    } else if (isSmallSizeScreen) {
      skeletonNumber = 4;
    } else if (isMediumSizeScreen) {
      skeletonNumber = 5;
    } else if (isBigSizeScreen) {
      skeletonNumber = 6;
    } else if (isLargeSizeScreen) {
      skeletonNumber = 8;
    }

    for (let i = 0; i < skeletonNumber; i++) {
      skeletons.push(
        <ImageListItem key={`Image-List-Skeleton-${i}`}>
          <SkeletonView variant="rectangular" borderRadius="7px" />
        </ImageListItem>
      );
    }
    return skeletons;
  }, [
    isBeforeMobileSizeScreen,
    isBigSizeScreen,
    isLargeSizeScreen,
    isMediumSizeScreen,
    isMobileSizeScreen,
    isSmallSizeScreen
  ]);
  // #endregion

  const handleScroll = useCallback(() => {
    if (listRef.current && reachListBottomHandler) {
      const isAtBottom = listRef.current.getBoundingClientRect().bottom <= window.innerHeight;
      if (isAtBottom) {
        reachListBottomHandler();
      }
    }
  }, [reachListBottomHandler]);

  useEffect(() => {
    if (reachListBottomHandler) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [reachListBottomHandler, handleScroll]);

  return (
    <ImageList gap={30} className={styles.imageList} cols={cols} ref={listRef}>
      {loading
        ? skeletonList
        : items.map((item) => {
            return (
              <ImageListItem key={`Image-List-Item-${item.key}`} className={styles.listItem}>
                <ImagePoster src={item.image} alt={`Item-Cover-${item.key}`} />

                <Box
                  position="absolute"
                  height="100%"
                  width="100%"
                  top={0}
                  display="none"
                  justifyContent="center"
                  className={styles.moreButton}
                >
                  {item.children}
                </Box>

                {item.title && (
                  <ImageListItemBar
                    title={item.title}
                    className={styles.listItemBar}
                    subtitle={item.subtitle}
                  />
                )}
              </ImageListItem>
            );
          })}
    </ImageList>
  );
};

export default ImageListView;
