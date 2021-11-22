import { Button, Box } from '@mui/material';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { DETAIL_PATH } from 'routes/Routes';

interface ReadMoreButtonProps {
  itemId: number;
}

const ReadMoreButton: FC<ReadMoreButtonProps> = (props: ReadMoreButtonProps) => {
  const { itemId } = props;
  const history = useHistory();

  return (
    <Box display="flex" alignItems="center">
      <Button variant="contained" onClick={() => history.push(`${DETAIL_PATH}${itemId}`)}>
        Read more
      </Button>
    </Box>
  );
};

export default ReadMoreButton;
