import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import React, { FC, ReactNode, useMemo } from 'react';
import styles from './ImageListView.module.scss';

export interface ImageItem {
  key: string;
  image: string;
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
}

interface ImageListProps {
  items: Array<ImageItem>;
}

const ImageListView: FC<ImageListProps> = (props: ImageListProps) => {
  const { items } = props;

  const theme = useTheme();
  const isLargeSizeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isBigSizeScreen = useMediaQuery(theme.breakpoints.only('lg'));
  const isMediumSizeScreen = useMediaQuery(theme.breakpoints.only('md'));
  const isSmallSizeScreen = useMediaQuery(theme.breakpoints.only('sm'));

  const cols = useMemo(() => {
    let numberCols = 1;

    if (isSmallSizeScreen) {
      numberCols = 2;
    } else if (isMediumSizeScreen) {
      numberCols = 3;
    } else if (isBigSizeScreen) {
      numberCols = 4;
    } else if (isLargeSizeScreen) {
      numberCols = 5;
    }

    return numberCols;
  }, [isSmallSizeScreen, isMediumSizeScreen, isBigSizeScreen, isLargeSizeScreen]);

  return (
    <ImageList gap={30} rowHeight={560} className={styles.imageList} cols={cols}>
      {items.map((item) => {
        return (
          <ImageListItem key={`Image-List-Item-${item.key}`} className={styles.listItem}>
            <img
              src={item.image}
              alt={`Item-Cover-${item.key}`}
              loading="lazy"
              className={styles.listItemImage}
            />

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

            <ImageListItemBar
              title={item.title}
              className={styles.listItemBar}
              subtitle={item.subtitle}
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default ImageListView;
