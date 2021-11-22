import { IMAGE_ASSETS } from 'assets/AssetCatalogue';
import React, { FC, useState } from 'react';
import CssSpinner from 'views/loadingIndicators/CssSpinner/CssSpinner';
import styles from './LazyImage.module.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyImage: FC<LazyImageProps> = (props: LazyImageProps) => {
  const { src, alt, className, style } = props;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        style={style}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsError(true)}
      />

      {!isImageLoaded && (
        <div className={`${styles.spinnerContainer} ${className}`}>
          <CssSpinner />
        </div>
      )}

      {isError && (
        <div className={`${styles.errorImageContainer} ${className}`}>
          <div className={styles.errorImageRelativeContainer}>
            <img
              src={IMAGE_ASSETS.NO_IMAGE_PLACEHOLDER}
              className={styles.errorImage}
              alt={`Error-Placeholder-${alt}`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LazyImage;
