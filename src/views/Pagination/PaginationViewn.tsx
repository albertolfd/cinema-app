import { Button, Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

const PaginationView: FC = () => {
  const theme = useTheme();

  const isMediumSizeScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallSizeScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {isMobileScreen ? (
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
