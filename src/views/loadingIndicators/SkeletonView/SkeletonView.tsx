import { Skeleton } from '@mui/material';
import React, { FC } from 'react';

interface SkeletonViewProps {
  height?: string;
  width?: string;
  variant: 'text' | 'rectangular' | 'circular';
  borderRadius?: string;
}

const SkeletonView: FC<SkeletonViewProps> = (props: SkeletonViewProps) => {
  const { height, width, variant, borderRadius } = props;

  return (
    <Skeleton
      variant={variant}
      width={width ?? '100%'}
      height={height ?? '100%'}
      sx={{ bgcolor: '#606d8b4a', borderRadius }}
    />
  );
};

export default SkeletonView;
