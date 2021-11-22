import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';
import LazyImage from '../LazyImage/LazyImage';
import styles from './ImagePoster.module.scss';

interface ImagePosterProps {
  src: string;
  alt: string;
}

const ImagePoster: FC<ImagePosterProps> = (props: ImagePosterProps) => {
  const { src, alt } = props;
  const theme = useTheme();
  const isMobileSizeScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const posterHeight = useMemo(() => {
    if (isMobileSizeScreen) {
      return 430;
    }
    return 560;
  }, [isMobileSizeScreen]);

  return (
    <Box display="flex">
      <LazyImage
        src={src}
        alt={alt}
        style={{ height: posterHeight }}
        className={styles.imagePoster}
      />
    </Box>
  );
};

export default ImagePoster;
