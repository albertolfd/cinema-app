import { IMAGE_ASSETS } from 'assets/AssetCatalogue';
import React, { FC, useState } from 'react';
import CssSpinner from 'views/loadingIndicators/CssSpinner/CssSpinner';
import styles from './LazyImage.module.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  imageContainerStyle?: React.CSSProperties;
  className?: string;
}

const LazyImage: FC<LazyImageProps> = (props: LazyImageProps) => {
  const { src, alt, imageContainerStyle, className } = props;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer} style={imageContainerStyle}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={className}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsError(true)}
        />
      </div>

      {!isImageLoaded && (
        <div className={styles.spinnerContainer} style={imageContainerStyle}>
          <CssSpinner />
        </div>
      )}

      {isError && (
        <div className={styles.errorImageContainer} style={imageContainerStyle}>
          <div className={styles.errorImageRelativeContainer}>
            <img
              src={IMAGE_ASSETS.NO_IMAGE_PLACEHOLDER}
              className={`${styles.errorImage} ${className} `}
              alt={`Error-Placeholder-${alt}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
