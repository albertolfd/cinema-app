import { Button, Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import SkeletonView from 'views/loadingIndicators/SkeletonView/SkeletonView';

interface PaginationViewProps {
  loading?: boolean;
  page: number;
  totalPages: number;
  isPreviousData: boolean;
  onChangePageHandler: (newPage: number) => void;
}

const PaginationView: FC<PaginationViewProps> = (props: PaginationViewProps) => {
  const { loading, page, totalPages, isPreviousData, onChangePageHandler } = props;
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
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => onChangePageHandler(Math.max(page - 1, 1))}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            disabled={page === totalPages || isPreviousData}
            onClick={() => onChangePageHandler(Math.min(page + 1, totalPages))}
          >
            Next
          </Button>
        </Stack>
      ) : (
        <Pagination
          count={totalPages}
          siblingCount={isMediumSizeScreen ? 1 : 2}
          boundaryCount={isSmallSizeScreen ? 0 : 1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          page={page}
          onChange={(event, newPage) => onChangePageHandler(newPage)}
        />
      )}
    </>
  );
};

export default PaginationView;
