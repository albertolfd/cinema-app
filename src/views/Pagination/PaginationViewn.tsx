import { Button, Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import SkeletonView from 'views/loadingIndicators/SkeletonView/SkeletonView';

interface PaginationViewProps {
  loading?: boolean;
}

const PaginationView: FC<PaginationViewProps> = (props: PaginationViewProps) => {
  const { loading } = props;
  const theme = useTheme();

  const isMediumSizeScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallSizeScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {loading ? (
        <SkeletonView variant="text" width="30vw" height="35px" />
      ) : isMobileScreen ? (
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Prev</Button>
          <Button variant="contained">Next</Button>
        </Stack>
      ) : (
        <Pagination
          count={86}
          siblingCount={isMediumSizeScreen ? 1 : 2}
          boundaryCount={isSmallSizeScreen ? 0 : 1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      )}
    </>
  );
};

export default PaginationView;
