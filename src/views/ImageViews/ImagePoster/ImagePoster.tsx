import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';
import LazyImage from '../LazyImage/LazyImage';
import styles from './ImagePoster.module.scss';

interface ImagePosterProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
}

const ImagePoster: FC<ImagePosterProps> = (props: ImagePosterProps) => {
  const { src, alt, height, width } = props;
  const theme = useTheme();
  const isMobileSizeScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const posterHeight = useMemo(() => {
    if (height) {
      return height;
    }

    if (isMobileSizeScreen) {
      return 310;
    }
    return 560;
  }, [height, isMobileSizeScreen]);

  return (
    <Box display="flex">
      <LazyImage
        src={src}
        alt={alt}
        imageContainerStyle={{ height: posterHeight, width, borderRadius: '7px' }}
        className={styles.imagePoster}
      />
    </Box>
  );
};

export default ImagePoster;
